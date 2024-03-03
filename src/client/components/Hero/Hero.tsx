import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <div class={styles.bg}>
          <h1 class={styles.title}>Шиномонтаж</h1>
        </div>
      </div>
    </section>
  );
}
