import { h } from "preact";
import styles from "./Input.module.css";

type IInput = h.JSX.HTMLAttributes<HTMLInputElement>;

export function Input({ class: className, ...props }: IInput) {
  return <input class={[styles.input, className].join(" ")} {...props} />;
}
