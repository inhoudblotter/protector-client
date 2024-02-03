import { Repair } from "./Repair";
import { TireFitting } from "./TireFitting";
import { Storage } from "./Storage";
import styles from "./Services.module.css";
import { h } from "preact";

interface IServices extends h.JSX.HTMLAttributes<HTMLElement> {}

export function Services({ ...props }: IServices) {
  return (
    <section class={styles.section} {...props}>
      <div class={styles.container}>
        <ul class={styles.items}>
          <TireFitting class={styles.item} />
          <Repair class={styles.item} />
          <Storage class={styles.item} />
        </ul>
      </div>
    </section>
  );
}
