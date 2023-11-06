import { h } from "preact";
import styles from "./Field.module.css";
import { Input } from "src/client/shared/ui/Input";

export interface IField extends h.JSX.HTMLAttributes<HTMLInputElement> {
  title: string;
}

export function Field({ title, class: className, ...props }: IField) {
  return (
    <label class={[styles.container, className].join(" ")}>
      <span class={styles.label}>{title}</span>
      <Input class={styles.input} {...props} />
    </label>
  );
}
