import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import styles from "./Calendar.module.css";
import { Day } from "./Day";
import { cn } from "src/client/shared/utils/cn";
import { IDates } from "src/client/shared/types/IDates";
import { IError } from "src/client/shared/types/IError";
import { getFreeDates } from "src/client/shared/api/freeTime/getFreeDates";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { Loader } from "src/client/shared/ui/Loader";
interface ICalendar extends h.JSX.HTMLAttributes<HTMLDivElement> {
  services: string[];
  wheels: number;
  month: string;
  setDate: (v: string) => void;
  setError: (v: IError) => void;
}

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function Calendar({
  month,
  setDate,
  services,
  wheels,
  class: className,
  setError,
}: ICalendar) {
  const [dates, setDates] = useState<IDates | null>(null);
  useEffect(() => {
    getFreeDates(month, { services, wheels })
      .then((data) => setDates(data))
      .catch((error) => {
        if (isError(error)) {
          setError(error);
        } else throw error;
      });
  }, [month, services, wheels]);
  return (
    <div class={cn(styles.container, className)}>
      <ul class={styles.header}>
        {DAYS.map((day) => (
          <li class={styles.day} key={day}>
            {day}
          </li>
        ))}
      </ul>
      <ul class={styles.items}>
        {dates === null ? (
          <Loader class={styles.loader} />
        ) : (
          dates.map((date, i) => <Day key={i} setDate={setDate} {...date} />)
        )}
      </ul>
    </div>
  );
}
