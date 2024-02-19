import { h } from "preact";
import styles from "./Accordion.module.css";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import { Content } from "./Content";

interface IAccordion extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Accordion({ title, children, onClose, onOpen }: IAccordion) {
  const { dropdownRef, triggerRef, contentRef, onContentMount, isOpen } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLDivElement>(
      styles.open,
      onClose
    );

  return (
    <div class={styles.container} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef}>
        <h2 class={styles.title}>{title}</h2>
        <span class={styles.line} />
        <span class={styles.arrow} />
      </button>
      {isOpen && (
        <Content
          onMount={() => {
            if (onOpen) onOpen();
            return onContentMount();
          }}
          class={styles.content}
          outerRef={contentRef}
        >
          {children}
        </Content>
      )}
    </div>
  );
}
