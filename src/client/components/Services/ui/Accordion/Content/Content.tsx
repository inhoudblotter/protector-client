import { h } from "preact";
import { RefObject, useCallback, useEffect } from "preact/compat";
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
  }, [outerRef]);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [outerRef, setSize]);
  return (
    <div class={className} ref={outerRef}>
      {children}
    </div>
  );
}
