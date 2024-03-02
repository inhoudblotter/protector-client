import { h } from "preact";
import { Checkbox } from "src/client/shared/ui/Checkbox";
import styles from "./ServicesItem.module.css";
import { Info } from "./Info";

export interface IServicesItem extends h.JSX.HTMLAttributes<HTMLInputElement> {
  title: string;
  descr?: string;
  price: string;
  checkbox?: boolean;
  lighten?: boolean;
}

export function ServicesItem({
  title,
  price,
  descr,
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
      {descr && <Info text={descr} />}
      <div class={styles.sep} />
      <span class={styles.price}>{price} &#8381;</span>
    </li>
  );
}
