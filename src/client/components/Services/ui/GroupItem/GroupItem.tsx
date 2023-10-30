import { h } from "preact";
import styles from "./GroupItem.module.css";
import { Accordion } from "../Accordion";
import { IServicesList, ServicesList } from "../ServicesList";
import { CheckoutForm, ICheckoutForm } from "../CheckoutForm";

export interface IGroupItem extends h.JSX.HTMLAttributes<HTMLLIElement> {
  title: string;
  checkoutProps: ICheckoutForm;
  servicesProps: IServicesList;
}

export function GroupItem({
  title,
  checkoutProps,
  servicesProps,
  class: className,
}: IGroupItem) {
  return (
    <li class={[styles.item, className].join(" ")}>
      <Accordion title={title}>
        <form class={styles.form}>
          <ServicesList class={styles.services} {...servicesProps} />
          <CheckoutForm class={styles.checkout} {...checkoutProps} />
        </form>
      </Accordion>
    </li>
  );
}
