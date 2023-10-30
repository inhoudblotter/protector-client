import { h } from "preact";
import { ServicesItem } from "./ServicesItem";
import styles from "./ServicesList.module.css";

export interface IServicesList
  extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  services: { title: string; price: number; checkbox?: boolean }[];
}

export function ServicesList({ services, class: className }: IServicesList) {
  return (
    <fieldset class={[styles.fieldset, className].join(" ")}>
      <ul class={styles.container}>
        {services.map((service, i) => (
          <ServicesItem key={i} {...service} />
        ))}
      </ul>
    </fieldset>
  );
}
