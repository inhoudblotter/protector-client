import { h } from "preact";
import { Line } from "../ui/Line";
import styles from "./Address.module.css";
import { IWorkTime } from "src/client/shared/types/IWorkTime";
import { formatTime } from "src/client/shared/utils/formatTime";

interface IAddress extends h.JSX.HTMLAttributes<HTMLDivElement> {
  city: string;
  street: string;
  house: string;
  phone: string;
  latitude: number;
  longitude: number;
  workTime: IWorkTime;
}

export function Address({
  city,
  street,
  house,
  phone,
  latitude,
  longitude,
  class: className,
  workTime,
}: IAddress) {
  return (
    <div
      class={[styles.container, className].join(" ")}
      itemscope
      itemtype="http://schema.org/Organization"
    >
      <span class={styles.meta} itemprop="name">
        Шиномонтаж Proтектор
      </span>
      <h2 class={styles.title}>Адрес</h2>
      <address
        class={styles.address}
        itemprop="address"
        itemscope
        itemtype="http://schema.org/PostalAddress"
      >
        <span
          class={styles.meta}
          itemprop="streetAddress"
        >{`ул. ${street}, д. ${house}`}</span>
        <Line label="Город" value={city} itemprop="addressLocality" />
        <Line label="Улица" value={street} />
        <Line label="Дом" value={house} />
      </address>
      <span class={styles.meta} itemprop="telephone">
        {phone}
      </span>
      <time
        class={styles.meta}
        itemprop="openingHours"
        datetime={`Mo-Su, ${formatTime(workTime.from.hours)}:${formatTime(
          workTime.from.minutes
        )}-${formatTime(workTime.to.hours)}:${formatTime(workTime.to.minutes)}`}
      >
        {`С понедельника по воскресенье, c ${formatTime(
          workTime.from.hours
        )}:${formatTime(workTime.from.minutes)} до ${formatTime(
          workTime.to.hours
        )}:${formatTime(workTime.to.minutes)}`}
      </time>
      <div
        class={styles.meta}
        itemprop="geo"
        itemscope
        itemtype="https://schema.org/GeoCoordinates"
      >
        <meta itemprop="latitude" content={latitude.toString()} />
        <meta itemprop="longitude" content={longitude.toString()} />
      </div>
    </div>
  );
}
