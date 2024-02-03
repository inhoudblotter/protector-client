import { useCallback, useState } from "preact/hooks";
import { ICarType } from "src/client/shared/types/ICarType";

export function useCarTypeField() {
  const [carType, setCarType] = useState<ICarType | null>(null);
  const onChangeCarType = useCallback(
    (v: string) => {
      setCarType(v as ICarType);
    },
    [setCarType]
  );
  return { carType, setCarType, onChangeCarType };
}
