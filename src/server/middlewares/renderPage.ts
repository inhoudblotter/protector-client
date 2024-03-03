import { NextFunction, Request, Response } from "express";
import { ViteDevServer } from "vite";
import { IRender } from "../types/IRender";
import { createContext } from "../utils/createContext";

export function renderPage(
  vite: ViteDevServer,
  baseTemplate: string,
  render: IRender,
  styles: string
) {
  const func = async (url: string, head: string, context = {}) => {
    const template = await vite.transformIndexHtml(url, baseTemplate);
    const appHtml = await render({ url, context });
    const contextString = createContext(context);
    const html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace(`<!--head-->`, head + styles)
      .replace(`<!--context-->`, contextString);
    return html;
  };
  const middleware = (req: Request, _: Response, next: NextFunction) => {
    req.renderPage = func;
    next();
  };
  return middleware;
}
