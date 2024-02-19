import { Router } from "express";
import { getSettings } from "../api/getSettings";

const router = Router();

router.get("/", async (req, res) => {
  const url = req.originalUrl;
  try {
    const settings = await getSettings();
    const html = await req.renderPage(
      url,
      `
      <link rel="preload" href="https://api-maps.yandex.ru/2.1/?apikey=${process.env.VITE_YANDEX_MAP_KEY}&lang=ru_RU" as="script"/>
      <title>Шиномонтаж ProТектор | Онлайн запись </title>
      <description>
    `,
      { settings }
    );
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.error(error);
    res.redirect("/server-error");
  }
});

router.get("/server-error", async (req, res) => {
  const html = await req.renderPage("/server-error", ``);
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

router.get("*", async (req, res) => {
  const html = await req.renderPage("/not-found", ``);
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

export default router;
