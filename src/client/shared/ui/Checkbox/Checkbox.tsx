import { h } from "preact";
import styles from "./Checkbox.module.css";

interface ICheckbox extends h.JSX.HTMLAttributes<HTMLLabelElement> {
  title: string;
}

export function Checkbox({ title, class: className }: ICheckbox) {
  return (
    <label class={[styles.container, className].join(" ")}>
      <input class={styles.input} type="checkbox" id="complex" />
      <div class={styles.icon}></div>
      <h3 class={styles.label}>{title}</h3>
    </label>
  );
}
