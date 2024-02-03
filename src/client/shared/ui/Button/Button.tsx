import { h } from "preact";
import styles from "./Button.module.css";
import { Loader } from "../Loader";
import { cn } from "../../utils/cn";

interface IButton extends h.JSX.HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({
  class: className,
  children,
  isLoading,
  ...props
}: IButton) {
  return (
    <button
      class={cn(styles.btn, className, isLoading && styles.loading)}
      {...props}
    >
      {children}
      {isLoading && <Loader class={styles.loader} />}
    </button>
  );
}
