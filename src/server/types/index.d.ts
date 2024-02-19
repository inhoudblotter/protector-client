import { Express, Router, Request } from "express";

declare global {
  declare namespace Express {
    interface Request {
      renderPage: (
        url: string,
        head: string,
        params?: object
      ) => Promise<string>;
    }
  }
}
