import { h } from "preact";
import { Line } from "../ui/Line";
import { Socials } from "./Socials";
import styles from "./Contacts.module.css";

interface IContacts extends h.JSX.HTMLAttributes<HTMLDivElement> {
  phone: string;
  whatsapp?: string;
  telegram?: string;
  viber?: string;
}

export function Contacts({
  phone,
  whatsapp,
  telegram,
  viber,
  class: className,
}: IContacts) {
  return (
    <div class={[styles.container, className].join(" ")}>
      <h2 class={styles.title}>Контакты</h2>
      <Line
        class={styles.item}
        label="Телефон"
        value="+7 (999) 222-22-22"
        href={`tel:${phone.replace(/[()\s\-]+/g, "")}`}
      />
      <Socials
        class={styles.item}
        whatsapp={whatsapp}
        telegram={telegram}
        viber={viber}
      />
    </div>
  );
}
