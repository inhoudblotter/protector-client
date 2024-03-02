import { RefObject, h } from "preact";
import styles from "./Content.module.css";
import { cn } from "src/client/shared/utils/cn";
import { useEffect } from "preact/hooks";
interface IContent extends h.JSX.HTMLAttributes<HTMLSpanElement> {
  text: string;
  onMount: () => void;
  outerRef: RefObject<HTMLSpanElement>;
}

export function Content({
  text,
  onMount,
  class: className,
  outerRef,
  ...props
}: IContent) {
  useEffect(() => {
    const container = outerRef.current;

    if (container) {
      const pos = container.getBoundingClientRect();

      let projection = window.innerWidth - pos.right - 15;
      if (projection > 0) projection = 0;
      container.style.setProperty("--left-position", `${projection}px`);
    }
    return onMount();
  }, [onMount, outerRef]);
  return (
    <span class={cn(styles.container, className)} {...props} ref={outerRef}>
      {text}
    </span>
  );
}
