import { h } from "preact";
import styles from "./Socials.module.css";
import { Telegram, Viber, WhatsApp } from "src/client/shared/ui/icons";

interface ISocials extends h.JSX.HTMLAttributes<HTMLDivElement> {
  whatsapp?: string;
  viber?: string;
  telegram?: string;
}

export function Socials({
  whatsapp,
  viber,
  telegram,
  class: className,
}: ISocials) {
  return (
    <div class={[styles.container, className].join(" ")}>
      {whatsapp && (
        <a class={styles.link} href={whatsapp} aria-label="WhatsApp">
          <WhatsApp class={styles.icon} />
        </a>
      )}
      {telegram && (
        <a class={styles.link} href={telegram} aria-label="Telegram">
          <Telegram class={styles.icon} />
        </a>
      )}
      {viber && (
        <a class={styles.link} href={viber} aria-label="Viber">
          <Viber class={styles.icon} />
        </a>
      )}
    </div>
  );
}
