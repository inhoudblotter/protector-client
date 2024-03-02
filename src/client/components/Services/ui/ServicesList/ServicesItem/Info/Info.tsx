import { h } from "preact";
import styles from "./Info.module.css";
import { cn } from "src/client/shared/utils/cn";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import { Content } from "./Content";
import { Question } from "src/client/shared/ui/icons/Question/Question";

interface IInfo extends h.JSX.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export function Info({ text, class: className, ...props }: IInfo) {
  const { triggerRef, contentRef, dropdownRef, onContentMount, isOpen } =
    useDropdown<HTMLDivElement, HTMLButtonElement, HTMLSpanElement>(
      styles.open
    );
  return (
    <div class={cn(styles.container, className)} {...props} ref={dropdownRef}>
      <button class={styles.trigger} ref={triggerRef} type={"button"}>
        <Question class={styles.icon} />
      </button>
      {isOpen && (
        <Content text={text} onMount={onContentMount} outerRef={contentRef} />
      )}
    </div>
  );
}
