import { h } from "preact";
import { useMemo } from "preact/hooks";
import styles from "./Calendar.module.css";
import { Day } from "./Day";

interface ICalendar extends h.JSX.HTMLAttributes<HTMLDivElement> {
  month: string;
  setDate: (v: string) => void;
}

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function Calendar({ month, setDate }: ICalendar) {
  const dates = useMemo(() => {
    const date = new Date(month);
    const temp = new Date(month);
    temp.setMonth(temp.getMonth() + 1);
    const nextMonth = temp.getMonth();
    const dates: { date: number; iso: string; disabled: boolean }[] = [];
    date.setDate(1);
    let day = date.getDay();
    if (day === 0) {
      date.setDate(date.getDate() - 6);
    } else date.setDate(date.getDate() - (day - 1));
    const today = new Date();
    while (date.getMonth() !== nextMonth || date.getDay() !== 1) {
      dates.push({
        date: date.getDate(),
        iso: date.toISOString(),
        disabled: date.getTime() < today.getTime(),
      });
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }, [month]);
  return (
    <div class={styles.container}>
      <ul class={styles.header}>
        {DAYS.map((day) => (
          <li class={styles.day} key={day}>
            {day}
          </li>
        ))}
      </ul>
      <ul class={styles.items}>
        {dates.map((date, i) => (
          <Day key={i} setDate={setDate} {...date} />
        ))}
      </ul>
    </div>
  );
}
