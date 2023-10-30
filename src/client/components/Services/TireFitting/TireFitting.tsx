import { h } from "preact";
import { GroupItem } from "../ui/GroupItem";

interface ITireFitting extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function TireFitting({ class: className }: ITireFitting) {
  return (
    <GroupItem
      title="Переобувка"
      class={className}
      servicesProps={{
        services: [
          { title: "Комплекс", price: 0 },
          { title: "Снятие и установка", price: 0 },
          { title: "Демонтаж", price: 0 },
          { title: "Монтаж", price: 0 },
          { title: "Балансировка", price: 0 },
        ],
      }}
      checkoutProps={{ carType: true }}
    />
  );
}
