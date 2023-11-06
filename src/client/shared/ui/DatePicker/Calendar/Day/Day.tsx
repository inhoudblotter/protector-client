import { h } from "preact";
import styles from "./Day.module.css";

interface IDay extends h.JSX.HTMLAttributes<HTMLLIElement> {
  date: number;
  iso: string;
  setDate: (v: string) => void;
}

export function Day({ date, iso, setDate, disabled }: IDay) {
  return (
    <li class={styles.container}>
      <button
        class={styles.btn}
        onClick={() => setDate(iso)}
        disabled={disabled}
        type={"button"}
      >
        {date}
      </button>
    </li>
  );
}
