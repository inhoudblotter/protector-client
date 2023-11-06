import { useState, useRef, useCallback, useEffect, useId } from "preact/hooks";
import { useCloseByClickOutside } from "./useCloseByClickOutside";

interface IUseDropdown {
  openClass: string;
  onClose?: () => void;
}

export function useDropdown<
  Container extends HTMLElement,
  Trigger extends HTMLElement
>({ openClass, onClose }: IUseDropdown) {
  const containerRef = useRef<Container>(null);
  const triggerRef = useRef<Trigger>(null);
  const [isOpen, setOpen] = useState(false);
  const id = useId();

  const close = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.classList.remove(openClass);
      container.addEventListener(
        "transitionend",
        () => {
          setOpen(false);
          if (onClose) onClose();
        },
        { once: true }
      );
    }
  }, [containerRef, setOpen, onClose]);

  const open = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.classList.add(openClass);
      setOpen(true);
    }
  }, [containerRef, openClass]);
  useCloseByClickOutside({
    closeFunction: close,
    containerRef,
    isOpen,
    id,
  });
  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener("click", open);
    }
    return () => {
      if (trigger) {
        trigger.removeEventListener("click", open);
      }
    };
  }, [containerRef]);
  return { containerRef, triggerRef, isOpen, open, close, setOpen };
}
