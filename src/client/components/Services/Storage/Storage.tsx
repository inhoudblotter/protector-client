import { h } from "preact";
import { useState } from "preact/hooks";
import { GroupItem } from "../ui/GroupItem";
import { useQuantityField } from "../hooks/useQuantityField";
import { useRadiusField } from "../hooks/useRadiusField";

interface IStorage extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function Storage({ class: className }: IStorage) {
  const [user, setUser] = useState<{ name: string; phone: string } | null>(
    null
  );
  const [error, setError] = useState<null | string>(null);
  const { quantity, onChangeQuantity } = useQuantityField();
  const { radius, onChangeRadius } = useRadiusField();

  function validateCheckoutForm() {
    if (!quantity || !radius) {
      setError("Выберите количество колёс и радиус.");
      return false;
    }
    return true;
  }

  function onSubmit() {}

  const checkoutDoneText =
    "Ждём вас с 10:00 до 20:00 по адресу Отрадная 25 ст. 3";

  return (
    <GroupItem
      title="Хранение"
      class={className}
      error={error ? { message: error, clean: () => setError(null) } : null}
      servicesProps={{
        services: [
          { title: "Сезонное хранение шин", price: 0, checkbox: false },
        ],
      }}
      checkoutProps={{
        orderText: "Забронировать",
        radiusProps: { value: radius, onChange: onChangeRadius },
        quantityProps: { value: quantity, onChange: onChangeQuantity },
        validateCheckoutForm,
        user,
        setUser,
        checkoutDoneText,
        onSubmit,
      }}
    />
  );
}
