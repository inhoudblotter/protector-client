import { h } from "preact";
import styles from "./OrderCreated.module.css";
import { Button } from "src/client/shared/ui/Button";

interface IOrder extends h.JSX.HTMLAttributes<HTMLDivElement> {
  text: string;
  closeFunction: () => void;
}

export function OrderCreated({ text, closeFunction }: IOrder) {
  return (
    <div class={styles.container}>
      <span class={styles.text}>{text}</span>
      <Button class={styles.btn} onClick={closeFunction}>
        Завершить
      </Button>
    </div>
  );
}
