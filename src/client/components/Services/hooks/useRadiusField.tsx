import { ChangeEvent } from "preact/compat";
import { useState, useCallback } from "preact/hooks";

export function useRadiusField() {
  const [radius, setRadius] = useState(14);
  const onChangeRadius = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.currentTarget.value);
      if (isNaN(v)) {
        setRadius(12);
      } else if (v < 12) {
        setRadius(12);
      } else if (v > 23) {
        setRadius(23);
      } else setRadius(v);
    },
    [setRadius]
  );
  return { radius, setRadius, onChangeRadius };
}
