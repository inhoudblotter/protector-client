import { Repair } from "./Repair";
import { TireFitting } from "./TireFitting";
import { Storage } from "./Storage";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section class={styles.section}>
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
