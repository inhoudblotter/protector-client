import { h } from "preact";
import styles from "./Header.module.css";
import { formatPhone } from "src/client/shared/utils/formatPhone";
import { useContext } from "preact/hooks";
import { settingsContext } from "src/client/shared/model/slices/settings";

type IHeader = h.JSX.HTMLAttributes<HTMLElement>;

export function Header({ ...props }: IHeader) {
  const settings = useContext(settingsContext);
  return (
    <header class={styles.header} {...props}>
      <div class={styles.container}>
        <a href="/" class={styles.homeLink}>
          <h2 class={styles.title}>ProТектор</h2>
        </a>
        <div class={styles.links}>
          <a class={styles.link} href="#address">
            Как добраться?
          </a>
          {settings ? (
            <a class={styles.link} href={`tel:${settings.phone}`}>
              {formatPhone(settings.phone)}
            </a>
          ) : (
            <div class={styles.phoneLoader} />
          )}
        </div>
      </div>
    </header>
  );
}
