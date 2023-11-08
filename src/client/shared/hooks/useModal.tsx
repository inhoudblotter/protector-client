import { useCallback, useRef, useEffect, useState, useId } from "preact/hooks";
import { useCloseByClickOutside } from "./useCloseByClickOutside";

interface IUseModal {
  openStyle: string;
  onClose: () => void;
}

export function useModal<
  Background extends HTMLElement,
  Container extends HTMLElement
>({ openStyle, onClose }: IUseModal) {
  const backgroundRef = useRef<Background>(null);
  const containerRef = useRef<Container>(null);
  const [isOpen, setOpen] = useState(false);
  const id = useId();

  const open = useCallback(() => {
    const bg = backgroundRef.current;
    if (bg) {
      bg.classList.add(openStyle);
      setOpen(true);
    }
  }, [backgroundRef, openStyle, setOpen]);

  const close = useCallback(() => {
    const bg = backgroundRef.current;
    if (bg) {
      bg.classList.remove(openStyle);
      bg.addEventListener(
        "transitionend",
        () => {
          setOpen(false);
          onClose();
        },
        { once: true }
      );
    }
  }, [backgroundRef, onClose, setOpen]);

  useCloseByClickOutside({
    closeFunction: close,
    containerRef,
    isOpen,
    id,
  });

  useEffect(() => {
    open();
    document.body.classList.add("stop-scroll");
    return () => {
      document.body.classList.remove("stop-scroll");
    };
  }, [open]);

  return { containerRef, backgroundRef, open, close, isOpen };
}