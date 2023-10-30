import { h } from "preact";
import { Field } from "../Field";
import { CarType } from "./CarType";
import styles from "./CheckoutForm.module.css";
import { Button } from "src/client/shared/ui/Button";

export interface ICheckoutForm
  extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  orderText?: string;
  carType?: boolean;
}

export function CheckoutForm({
  class: className,
  orderText = "Записаться",
  carType,
}: ICheckoutForm) {
  return (
    <fieldset class={[styles.container, className].join(" ")}>
      {carType && <CarType class={styles.carType} />}
      <Field title="Радиус колёс:" type={"number"} min={"12"} max={"30"} />
      <Field title="Количество колёс:" type={"number"} min={"1"} max={"6"} />
      <Button class={styles.submit} type={"submit"}>
        {orderText}
      </Button>
    </fieldset>
  );
}
