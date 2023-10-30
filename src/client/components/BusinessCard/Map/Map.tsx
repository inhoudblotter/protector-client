import { h } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import styles from "./Map.module.css";
import type maps from "yandex-maps";

declare const ymaps: typeof maps;

interface IMap extends h.JSX.HTMLAttributes<HTMLDivElement> {
  cordinates: [number, number];
}

export function Map({ cordinates, class: className }: IMap) {
  const ref = useRef<HTMLDivElement>(null);
  const createMap = useCallback(async () => {
    await ymaps.ready();
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const map = new ymaps.Map(ref.current, {
      center: cordinates,
      zoom: 15,
      behaviors: [],
      controls: [],
    });

    ref.current.addEventListener(
      "click",
      () => {
        map.behaviors.enable(["scrollZoom", "drag"]);
        map.controls.add("zoomControl");
      },
      { once: true }
    );
    const dot = new ymaps.Placemark(cordinates, {});

    map.geoObjects.add(dot);
  }, [ref]);

  useEffect(() => {
    let script = document.head.querySelector<HTMLScriptElement>("#ymaps");
    if (script === null) {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.defer = true;
      script.id = "ymaps";
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${
        import.meta.env.VITE_YANDEX_MAP_KEY
      }&lang=ru_RU`;
      document.head.insertBefore(script, document.head.lastChild);
    }
    script.addEventListener("load", createMap, { once: true });
    return () => {
      const script = document.head.querySelector("#ymaps");
      if (script) script.remove();
    };
  }, [ref]);

  return <div class={[styles.container, className].join(" ")} ref={ref}></div>;
}
