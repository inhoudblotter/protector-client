import { h } from "preact";
import { useCallback } from "preact/hooks";
import { useDropdown } from "src/client/shared/hooks/useDropdown";
import styles from "./TimeItem.module.css";
import { formatTime } from "src/client/shared/utils/formatTime";

interface ITimeItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  hour: number;
  minutes: number[];
  date: string;
  setTime: (v: string) => void;
}

export function TimeItem({ hour, minutes, date, setTime }: ITimeItem) {
  const { containerRef, triggerRef } = useDropdown<
    HTMLLIElement,
    HTMLButtonElement
  >({ openClass: styles.open });
  const handleClick = (m: number) =>
    useCallback(() => {
      const temp = new Date(date);
      temp.setHours(hour, m);
      setTime(temp.toISOString());
    }, [m]);
  return (
    <li class={styles.container} ref={containerRef}>
      <button class={styles.trigger} ref={triggerRef} type={"button"}>
        {`${formatTime(hour)}:${formatTime(minutes[0])}`}
      </button>
      <ul class={styles.items}>
        {minutes.map((m) => (
          <li class={styles.item} key={m}>
            <button
              class={styles.option}
              onClick={handleClick(m)}
              type={"button"}
            >
              {`${formatTime(hour)}:${formatTime(m)}`}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
}
