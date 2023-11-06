import { h } from "preact";
import { useEffect, useRef, useState, useCallback, useId } from "preact/hooks";
import styles from "./Accordion.module.css";
import { useCloseByClickOutside } from "src/client/shared/hooks/useCloseByClickOutside";

interface IAccordion extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Accordion({ title, children, onOpen, onClose }: IAccordion) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>();
  const close = useCallback(() => {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose, setOpen]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, [setWindowWidth]);

  const handleClick = useCallback(() => {
    if (isOpen) {
      close();
    } else setOpen(true);
  }, [isOpen, setOpen, close]);

  useEffect(() => {
    const content = contentRef.current;
    if (content)
      content.style.setProperty("--height", `${content.scrollHeight}px`);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contentRef, windowWidth]);

  const id = useId();

  useCloseByClickOutside({
    closeFunction: close,
    containerRef: ref,
    isOpen,
    id,
  });

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

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
