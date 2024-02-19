import { ViteDevServer } from "vite";
import { createContext } from "../utils/createContext";
import { IRender } from "../types/IRender";
import { NextFunction } from "express";

export function renderPage(
  vite: ViteDevServer,
  baseTemplate: string,
  render: IRender,
  styles: string
) {
  const func = async (
    url: string,
    head: string,
    preloadState: { [key: string]: object } = {}
  ) => {
    const template = await vite.transformIndexHtml(url, baseTemplate);
    const appHtml = await render({ url, preloadState });
    const context = createContext(preloadState);
    const html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace(`<!--head-->`, head + styles)
      .replace(`<!--context-->`, context);
    return html;
  };
  const middleware = (req: Request, _: Response, next: NextFunction) => {
    req.renderPage = func;
    next();
  };
  return middleware;
}
