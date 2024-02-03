import { h } from "preact";
import { RefObject, useCallback, useEffect } from "preact/compat";
import styles from "./Content.module.css";
import { cn } from "src/client/shared/utils/cn";
interface IContent extends h.JSX.HTMLAttributes<HTMLDivElement> {
  outerRef: RefObject<HTMLDivElement>;
  onMount: () => void;
}

export function Content({
  class: className,
  outerRef,
  onMount,
  children,
}: IContent) {
  useEffect(() => {
    return onMount();
  }, [onMount]);

  const setSize = useCallback(() => {
    const content = outerRef.current;
    if (content) {
      content.style.setProperty("--height", `${content.scrollHeight + 3}px`);
    }
  }, []);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [outerRef]);
  return (
    <div class={className} ref={outerRef}>
      {children}
    </div>
  );
}
