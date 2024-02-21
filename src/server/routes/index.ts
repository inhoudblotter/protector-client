import { Router } from "express";
import { getSettings } from "../api/getSettings";
import "dotenv/config";
import { formatPhone } from "src/client/shared/utils/formatPhone";
const router = Router();

router.get("/", async (req, res) => {
  const url = req.originalUrl;
  try {
    const settings = await getSettings();
    const title = "Шиномонтаж ProТектор | Онлайн запись";
    const descr = `Онлайн запись на шиномонтаж. Комплекс от ${
      settings.services.complex.prices.passengerCar[14] * 4
    } руб. Мы находимся на ул. ${settings.address.street} ${
      settings.address.house
    }. Тел.: ${formatPhone(settings.phone)}`;
    const html = await req.renderPage(
      url,
      `
      <link rel="preload" href="https://api-maps.yandex.ru/2.1/?apikey=${process.env.VITE_YANDEX_MAP_KEY}&lang=ru_RU" as="script"/>
      <title>${title}</title>
      <meta name="description" content="${descr}">
      <meta property="og:title" content="${title}"/>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${process.env.VITE_HOST}/" />
      <meta property="og:image" content="${process.env.VITE_HOST}/images/og/main.jpg"/>
      <meta property="og:description" content="${descr}"/>
      <meta name="robots" content="all"/>
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
  const html = await req.renderPage(
    "/server-error",
    `
  <title>Ошибка на сервере</title>
  <meta name="robots" content="noindex" />
  `
  );
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

router.get("*", async (req, res) => {
  const html = await req.renderPage(
    "/not-found",
    `
  <title>Страница не найдена</title>
  <meta name="robots" content="noindex" />
  `
  );
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

export default router;
