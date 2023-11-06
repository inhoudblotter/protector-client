import { RefObject } from "preact";
import { useCallback, useEffect } from "preact/hooks";

interface IUseCloseByClickOutside<Container extends HTMLElement> {
  containerRef: RefObject<Container>;
  closeFunction: () => void;
  isOpen: boolean;
  id: string;
}

export function useCloseByClickOutside<Container extends HTMLElement>({
  containerRef,
  closeFunction,
  isOpen,
  id,
}: IUseCloseByClickOutside<Container>) {
  const closeByClickOutside = useCallback(
    (e: { _isContent?: string[] } & MouseEvent) => {
      if (!e._isContent || !e._isContent.some((el) => el === id))
        closeFunction();
    },
    [containerRef, closeFunction, id]
  );

  const setIsContent = useCallback(
    (e: { _isContent?: string[] } & MouseEvent) => {
      if (e._isContent) {
        e._isContent.push(id);
      } else e._isContent = [id];
    },
    [id]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      if (isOpen) {
        container.addEventListener("click", setIsContent);
        document.body.addEventListener("click", closeByClickOutside);
      } else {
        container.removeEventListener("click", setIsContent);
        document.body.removeEventListener("click", closeByClickOutside);
      }
    }
    return () => {
      if (container) {
        container.removeEventListener("click", setIsContent);
        document.body.addEventListener("click", closeByClickOutside);
      }
    };
  }, [containerRef, closeFunction, isOpen]);
}
