import { h } from "preact";
import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import styles from "./Accordion.module.css";

interface IAccordion extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function Accordion({ title, children }: IAccordion) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  useEffect(() => {
    const content = contentRef.current;
    if (content)
      content.style.setProperty("--height", `${content.scrollHeight}px`);
  }, [contentRef]);

  const closeByClickOutside = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (el && e.target instanceof Node && !el.contains(e.target))
        setOpen(false);
    },
    [ref]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", closeByClickOutside);
    } else document.body.removeEventListener("click", closeByClickOutside);
    return () =>
      document.body.removeEventListener("click", closeByClickOutside);
  }, [isOpen]);

  return (
    <div
      class={[styles.container, isOpen ? styles.open : undefined].join(" ")}
      ref={ref}
    >
      <button class={styles.trigger} onClick={handleClick}>
        <h3 class={styles.title}>{title}</h3>
        <span class={styles.line}></span>
        <span class={styles.arrow}></span>
      </button>
      <div class={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
