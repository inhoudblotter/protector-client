import { h } from "preact";
import styles from "./Line.module.css";

interface ILine extends h.JSX.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  href?: string;
}

export function Line({ label, value, href, class: className }: ILine) {
  return (
    <div class={[styles.container, className].join(" ")}>
      <h3 class={styles.label}>{label}</h3>
      {href ? (
        <a class={styles.value} href={href}>
          {value}
        </a>
      ) : (
        <p class={styles.value}>{value}</p>
      )}
    </div>
  );
}
