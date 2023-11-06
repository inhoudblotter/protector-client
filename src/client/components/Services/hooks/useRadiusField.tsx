import { ChangeEvent } from "preact/compat";
import { useState, useCallback } from "preact/hooks";

export function useRadiusField() {
  const [radius, setRadius] = useState(14);
  const onChangeRadius = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRadius(Number(e.currentTarget.value));
    },
    [setRadius]
  );
  return { radius, setRadius, onChangeRadius };
}
