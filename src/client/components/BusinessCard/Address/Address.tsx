import { h } from "preact";
import { Line } from "../ui/Line";
import styles from "./Address.module.css";

interface IAddress extends h.JSX.HTMLAttributes<HTMLDivElement> {
  city: string;
  street: string;
  house: string;
}

export function Address({ city, street, house, class: className }: IAddress) {
  return (
    <div class={[styles.container, className].join(" ")}>
      <h2 class={styles.title}>Адрес</h2>
      <address class={styles.address}>
        <Line label="Город" value={city} />
        <Line label="Улица" value={street} />
        <Line label="Дом" value={house} />
      </address>
    </div>
  );
}
