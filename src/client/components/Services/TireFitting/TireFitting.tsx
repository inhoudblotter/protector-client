import { h } from "preact";
import { GroupItem } from "../ui/GroupItem";
import { useState, useCallback, useMemo } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { formatTime } from "src/client/shared/utils/formatTime";
import { useRadiusField } from "../hooks/useRadiusField";
import { useQuantityField } from "../hooks/useQuantityField";
import { useCarTypeField } from "../hooks/useCarTypeFiled";

interface ITireFitting extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function TireFitting({ class: className }: ITireFitting) {
  const [complex, setComplex] = useState(true);
  const [removalAndInstalation, setRemovalAndInstalation] = useState(true);
  const [dismantling, setDismantling] = useState(true);
  const [instalation, setInstalation] = useState(true);
  const [balancing, setBalancing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(
    null
  );
  const { radius, onChangeRadius } = useRadiusField();
  const { quantity, onChangeQuantity } = useQuantityField();
  const { carType, onChangeCarType } = useCarTypeField();

  const onChangeComplex = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setComplex(checked);
      if (checked) {
        [
          setRemovalAndInstalation,
          setDismantling,
          setInstalation,
          setBalancing,
        ].forEach((f) => f(true));
      }
    },
    [setComplex, setRemovalAndInstalation]
  );

  const onChangeOtherService = useCallback(
    (setValue: (v: boolean) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setValue(checked);
      if (!checked) setComplex(false);
    },
    [setComplex]
  );
  function validateCheckoutForm() {
    setError(null);
    if (
      ![
        complex,
        removalAndInstalation,
        dismantling,
        instalation,
        balancing,
      ].some((s) => !!s)
    ) {
      setError("Выбирите услугу");
      return false;
    } else if (![carType, radius, quantity].every((p) => !!p)) {
      setError("Заполните данные о автомобиле");
      return false;
    }
    return true;
  }

  const checkoutDoneText = useMemo(() => {
    if (!date) return "Что-то пошло не так...";
    const temp = new Date(date);
    const [day, hours, minutes] = [
      temp.getDate(),
      temp.getHours(),
      temp.getMinutes(),
    ];
    return `Ждём вас ${day} числа в ${formatTime(hours)}:${formatTime(
      minutes
    )}.`;
  }, [date]);

  function onSubmit() {}

  return (
    <>
      <GroupItem
        title="Переобувка"
        class={className}
        servicesProps={{
          services: [
            {
              title: "Комплекс",
              price: 0,
              checked: complex,
              onChange: onChangeComplex,
            },
            {
              title: "Снятие и установка",
              price: 0,
              checked: removalAndInstalation,
              onChange: onChangeOtherService(setRemovalAndInstalation),
              lighten: complex,
            },
            {
              title: "Демонтаж",
              price: 0,
              checked: dismantling,
              onChange: onChangeOtherService(setDismantling),
              lighten: complex,
            },
            {
              title: "Монтаж",
              price: 0,
              checked: instalation,
              onChange: onChangeOtherService(setInstalation),
              lighten: complex,
            },
            {
              title: "Балансировка",
              price: 0,
              checked: balancing,
              onChange: onChangeOtherService(setBalancing),
              lighten: complex,
            },
          ],
        }}
        error={error ? { message: error, clean: () => setError(null) } : null}
        checkoutProps={{
          carTypeProps: { setValue: onChangeCarType },
          radiusProps: { value: radius, onChange: onChangeRadius },
          quantityProps: { value: quantity, onChange: onChangeQuantity },
          validateCheckoutForm,
          onSubmit,
          date,
          setDate,
          user,
          setUser,
          checkoutDoneText,
        }}
      />
    </>
  );
}
