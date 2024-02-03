import { h } from "preact";
import { TimeItem } from "./TimeItem";
import styles from "./TimeList.module.css";
import { useEffect, useState } from "preact/hooks";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { IError } from "src/client/shared/types/IError";
import { getFreeTimes } from "src/client/shared/api/freeTime/getFreeTimes";
import { route } from "preact-router";
import { Loader } from "src/client/shared/ui/Loader";

interface ITimeList extends h.JSX.HTMLAttributes<HTMLUListElement> {
  date: string;
  services: string[];
  wheels: number;
  setTime: (v: string) => void;
  setError: (v: IError) => void;
}

export function TimeList({
  date,
  setTime,
  services,
  wheels,
  setError,
}: ITimeList) {
  const [freeTime, setFreeTime] = useState<string[][] | null>(null);
  useEffect(() => {
    getFreeTimes(date, { services, wheels })
      .then((times) => setFreeTime(times))
      .catch((error) => {
        if (isError(error)) {
          setError(error);
        } else {
          route("/server-error");
          throw error;
        }
      });
  }, [setFreeTime, services, wheels]);
  return (
    <ul class={styles.container}>
      {freeTime === null ? (
        <Loader class={styles.loader} />
      ) : (
        freeTime.map((times) => (
          <TimeItem key={times[0]} times={times} setTime={setTime} />
        ))
      )}
    </ul>
  );
}
