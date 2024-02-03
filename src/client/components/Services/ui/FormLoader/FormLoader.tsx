import { Loader } from "src/client/shared/ui/Loader";
import styles from "./FormLoader.module.css";
import { h } from "preact";

interface IFormLoader extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function FormLoader({ title, ...props }: IFormLoader) {
  return (
    <div class={styles.container} {...props}>
      <h3 class={styles.title}>{title}</h3>
      <Loader class={styles.loader} />
    </div>
  );
}
