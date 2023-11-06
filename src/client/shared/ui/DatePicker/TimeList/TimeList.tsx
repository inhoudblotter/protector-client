import { h } from "preact";
import { TimeItem } from "./TimeItem";
import styles from "./TimeList.module.css";

interface ITimeList extends h.JSX.HTMLAttributes<HTMLUListElement> {
  date: string;
  setTime: (v: string) => void;
}

const FREE_TIME: { [hour: number]: number[] } = {
  15: [0, 15, 30, 45],
  16: [0, 15, 30, 45],
  17: [0, 15, 30, 45],
  18: [0, 15, 30, 45],
  19: [0, 15, 30, 45],
};

export function TimeList({ date, setTime }: ITimeList) {
  return (
    <ul class={styles.container}>
      {Object.keys(FREE_TIME).map((h) => (
        <TimeItem
          key={h}
          hour={Number(h)}
          minutes={FREE_TIME[Number(h)]}
          date={date}
          setTime={setTime}
        />
      ))}
    </ul>
  );
}
