import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.DEPLOYMENT_ENV === "vercel";

export const resolve = (p: string) => path.resolve(__dirname, p);

export async function getStyles() {
  try {
    const assetpath = resolve("public");
    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter((l) => l.endsWith(".css"));
    const allContent = [];
    for (const asset of cssAssets) {
      allContent.push(
        `<link rel="stylesheet" href="${path.join(assetpath, asset)}">`
      );
    }
    return allContent.join("\n");
  } catch {
    return "";
  }
}

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: !isProd },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
    root: isProd ? "dist" : "",
    optimizeDeps: {
      include: ["./public/assets/**/*"],
    },
  });

  app.use(vite.middlewares);

  app.use(express.static(resolve("public")));

  if (isProd) {
    app.use(compression());
  }

  const baseTemplate = await fs.readFile(
    isProd ? resolve("./index.html") : resolve("../../index.html"),
    "utf-8"
  );
  const styles = await getStyles();

  const productionBuildPath = path.join(__dirname, "./entry.server.js");
  const devBuildPath = path.join(__dirname, "../client/app/entry.server.tsx");
  const buildModule = isProd ? productionBuildPath : devBuildPath;
  const { render } = await vite.ssrLoadModule(buildModule);

  async function renderPage(url: string) {
    const template = await vite.transformIndexHtml(url, baseTemplate);
    const appHtml = await render({ url });
    const html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace(`<!--head-->`, styles);
    return html;
  }

  app.get("/", async (req, res) => {
    const url = req.originalUrl;
    const html = await renderPage(url);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  app.get("*", async (req, res) => {
    const url = req.originalUrl;
    const html = await renderPage(url);
    res.status(404).set({ "Content-Type": "text/html" }).end(html);
  });

  const PORT = process.env.PORT || 5173;

  if (!isVercel) {
    app.listen(PORT, () => {
      console.log(`Server starts on http://localhost:${PORT}`);
    });
  }

  return app;
}

export default createServer();
