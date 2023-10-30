import styles from "./Header.module.css";

export function Header() {
  return (
    <header class={styles.header}>
      <div class={styles.container}>
        <a href="/" class={styles.homeLink}>
          <h2 class={styles.title}>ProТектор</h2>
        </a>
        <div class={styles.links}>
          <a class={styles.link} href="#">
            Как добраться?
          </a>
          <a class={styles.link} href="tel:+79518017722">
            +7 (951) 801-77-22
          </a>
        </div>
      </div>
    </header>
  );
}
