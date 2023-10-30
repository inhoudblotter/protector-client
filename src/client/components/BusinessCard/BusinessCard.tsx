import { Address } from "./Address";
import { Contacts } from "./Contacts";
import styles from "./BusinessCard.module.css";
import { Map } from "./Map";

export function BusinessCard() {
  return (
    <section class={styles.section}>
      <div class={styles.container}>
        <Address
          city="Челябинск"
          street="Отрадная"
          house="25 ст 3"
          class={styles.address}
        />
        <Map cordinates={[55.179921, 61.337119]} class={styles.map} />
        <Contacts
          phone="+7 (999) 222-22-22"
          telegram="#"
          whatsapp="#"
          viber="#"
          class={styles.contacts}
        />
      </div>
    </section>
  );
}
