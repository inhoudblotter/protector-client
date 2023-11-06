import { ChangeEvent } from "preact/compat";
import { useCallback, useState } from "preact/hooks";

export function useQuantityField(defaultState: number = 4) {
  const [quantity, setQuantity] = useState(defaultState);
  const onChangeQuantity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.currentTarget.value));
    },
    [setQuantity]
  );
  return { quantity, setQuantity, onChangeQuantity };
}
