import { h } from "preact";
import { useModal } from "../../hooks/useModal";
import styles from "./Modal.module.css";
import { Close } from "../icons";
import { useEffect } from "preact/hooks";

interface IModal extends h.JSX.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  setClose?: boolean;
}

export function Modal({ onClose, children, setClose }: IModal) {
  const { containerRef, backgroundRef, close } = useModal<
    HTMLDivElement,
    HTMLDivElement
  >({ openStyle: styles.open, onClose });

  useEffect(() => {
    if (setClose) close();
  }, [setClose]);

  return (
    <div class={styles.background} ref={backgroundRef}>
      <div class={styles.container} ref={containerRef}>
        <button
          class={styles.closeBtn}
          aria-label={"Закрыть"}
          onClick={close}
          type={"button"}
        >
          <Close class={styles.closeIcon} />
        </button>
        <div class={styles.content}>{children}</div>
      </div>
    </div>
  );
}
