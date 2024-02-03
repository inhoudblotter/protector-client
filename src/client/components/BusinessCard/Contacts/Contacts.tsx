import { h } from "preact";
import { Line } from "../ui/Line";
import { Socials } from "./Socials";
import styles from "./Contacts.module.css";
import { formatPhone } from "src/client/shared/utils/formatPhone";

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
        value={formatPhone(phone)}
        href={`tel:${phone}`}
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
