import { ChangeEvent } from "preact/compat";
import { useCallback, useState } from "preact/hooks";

export function useQuantityField(defaultState: number = 4) {
  const [quantity, setQuantity] = useState(defaultState);
  const onChangeQuantity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.currentTarget.value);
      if (isNaN(v)) {
        setQuantity(1);
      } else if (v < 1) {
        setQuantity(1);
      } else if (v > 6) {
        setQuantity(6);
      } else setQuantity(v);
    },
    [setQuantity]
  );
  return { quantity, setQuantity, onChangeQuantity };
}
