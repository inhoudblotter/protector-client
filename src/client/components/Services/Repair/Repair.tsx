import { h } from "preact";
import { GroupItem } from "../ui/GroupItem";

interface IRepair extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function Repair({ class: className }: IRepair) {
  return (
    <GroupItem
      title="Ремонт"
      class={className}
      servicesProps={{
        services: [
          { title: "Ремонт грыжи", price: 0 },
          { title: "Ремонт пореза", price: 0 },
          { title: "Ремонт прокола", price: 0 },
          { title: "Балансировка", price: 0 },
          { title: "Монтаж и демонтаж", price: 0 },
        ],
      }}
      checkoutProps={{}}
    />
  );
}
