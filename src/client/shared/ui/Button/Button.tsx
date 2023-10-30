import { h } from "preact";
import styles from "./Button.module.css";

interface IButton extends h.JSX.HTMLAttributes<HTMLButtonElement> {}

export function Button({ class: className, children, ...props }: IButton) {
  return (
    <button class={[styles.btn, className].join(" ")} {...props}>
      {children}
    </button>
  );
}
