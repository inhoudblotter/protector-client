import { h } from "preact";
import { GroupItem } from "../ui/GroupItem";

interface IStorage extends h.JSX.HTMLAttributes<HTMLLIElement> {}

export function Storage({ class: className }: IStorage) {
  return (
    <GroupItem
      title="Переобувка"
      class={className}
      servicesProps={{
        services: [
          { title: "Сезонное хранение шин", price: 0, checkbox: false },
        ],
      }}
      checkoutProps={{ orderText: "Забронировать" }}
    />
  );
}
