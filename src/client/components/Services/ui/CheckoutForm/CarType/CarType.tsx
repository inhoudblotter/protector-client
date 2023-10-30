import { h } from "preact";
import styles from "./CarType.module.css";

interface ICarType extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function CarType({ class: className }: ICarType) {
  return (
    <div class={[styles.container, className].join(" ")}>
      <label class={styles.radio}>
        <input class={styles.input} type="radio" name="car-type"></input>
        <span class={styles.label}>Легковой</span>
      </label>
      <label class={styles.radio}>
        <input class={styles.input} type="radio" name="car-type"></input>
        <span class={styles.label}>Кроссовер / Внедорожник</span>
      </label>
    </div>
  );
}
