import { h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";
import { GroupItem } from "../ui/GroupItem";
import { ChangeEvent } from "preact/compat";
import { useCarTypeField } from "../hooks/useCarTypeFiled";
import { useQuantityField } from "../hooks/useQuantityField";
import { useRadiusField } from "../hooks/useRadiusField";
import { formatTime } from "src/client/shared/utils/formatTime";

interface IRepair extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function Repair({ class: className }: IRepair) {
  const [addSpikes, setAddSpikes] = useState(false);
  const [cut, setCut] = useState(false);
  const [puncture, setPuncture] = useState(false);
  const [removalAndInstalation, setRemovalAndInstalation] = useState(true);
  const { carType, onChangeCarType } = useCarTypeField();
  const { quantity, onChangeQuantity } = useQuantityField(1);
  const { radius, onChangeRadius } = useRadiusField();
  const [date, setDate] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const onChange = (setValue: (v: boolean) => void) =>
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.checked);
      },
      [setValue]
    );

  function validateCheckoutForm() {
    if ([addSpikes, puncture, cut, removalAndInstalation].every((el) => !el)) {
      setError("Выберите услугу");
      return false;
    } else if ([carType, radius].some((el) => !el)) {
      setError("Заполните данные о машине");
      return false;
    } else return true;
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
    <GroupItem
      title="Ремонт"
      class={className}
      servicesProps={{
        services: [
          {
            title: "Дошиповка",
            price: 0,
            checked: addSpikes,
            onChange: onChange(setAddSpikes),
          },
          {
            title: "Ремонт пореза",
            price: 0,
            checked: cut,
            onChange: onChange(setCut),
          },
          {
            title: "Ремонт прокола",
            price: 0,
            checked: puncture,
            onChange: onChange(setPuncture),
          },
          {
            title: "Монтаж и демонтаж",
            price: 0,
            checked: removalAndInstalation,
            onChange: onChange(setRemovalAndInstalation),
          },
        ],
      }}
      error={error ? { message: error, clean: () => setError(null) } : null}
      checkoutProps={{
        carTypeProps: { setValue: onChangeCarType },
        radiusProps: { value: radius, onChange: onChangeRadius },
        quantityProps: { value: quantity, onChange: onChangeQuantity },
        user,
        setUser,
        date,
        setDate,
        validateCheckoutForm,
        checkoutDoneText,
        onSubmit,
      }}
    />
  );
}
