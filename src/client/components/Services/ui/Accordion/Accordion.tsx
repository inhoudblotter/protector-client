import { h } from "preact";
import { useEffect, useRef, useState, useCallback, useId } from "preact/hooks";
import styles from "./Accordion.module.css";
import { useCloseByClickOutside } from "src/client/shared/hooks/useCloseByClickOutside";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import { Content } from "./Content";

interface IAccordion extends h.JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Accordion({ title, children, onOpen, onClose }: IAccordion) {
  const { dropdownRef, triggerRef, contentRef, onContentMount, isOpen } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLDivElement>(styles.open);

  return (
    <div class={styles.container} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef}>
        <h3 class={styles.title}>{title}</h3>
        <span class={styles.line}></span>
        <span class={styles.arrow}></span>
      </button>
      {isOpen && (
        <Content
          onMount={onContentMount}
          class={styles.content}
          outerRef={contentRef}
        >
          {children}
        </Content>
      )}
    </div>
  );
}
