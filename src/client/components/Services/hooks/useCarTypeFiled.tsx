import { useCallback, useState } from "preact/hooks";

export function useCarTypeField() {
  const [carType, setCarType] = useState<string | null>(null);
  const onChangeCarType = useCallback(
    (v: string) => {
      setCarType(v);
    },
    [setCarType]
  );
  return { carType, setCarType, onChangeCarType };
}
