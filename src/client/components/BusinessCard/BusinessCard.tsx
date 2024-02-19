import { Address } from "./Address";
import { Contacts } from "./Contacts";
import styles from "./BusinessCard.module.css";
import { Map } from "./Map";
import { useContext } from "preact/hooks";
import { settingsContext } from "src/client/shared/model/slices/settings";

export function BusinessCard() {
  const settings = useContext(settingsContext);
  if (!settings) return null;
  return (
    <section class={styles.section} id={"address"}>
      <div class={styles.container}>
        <Address
          city="Челябинск"
          street={settings.address.street}
          house={settings.address.house}
          class={styles.address}
        />
        <Map
          cordinates={[settings.address.latitude, settings.address.longitude]}
          class={styles.map}
        />
        <Contacts
          phone={settings.phone}
          telegram={settings.socials.telegram}
          whatsapp={settings.socials.whats_app}
          viber={settings.socials.viber}
          class={styles.contacts}
        />
      </div>
    </section>
  );
}
