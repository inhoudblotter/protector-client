import { h } from "preact";
import { Checkbox } from "src/client/shared/ui/Checkbox";
import styles from "./ServicesItem.module.css";

export interface IServicesItem extends h.JSX.HTMLAttributes<HTMLInputElement> {
  title: string;
  price: string;
  checkbox?: boolean;
  lighten?: boolean;
}

export function ServicesItem({
  title,
  price,
  checkbox = true,
  ...props
}: IServicesItem) {
  return (
    <li class={styles.item}>
      {checkbox ? (
        <Checkbox title={title} class={styles.checkbox} {...props} />
      ) : (
        <h3 class={styles.title}>{title}</h3>
      )}
      <div class={styles.sep}></div>
      <span class={styles.price}>{price} &#8381;</span>
    </li>
  );
}
