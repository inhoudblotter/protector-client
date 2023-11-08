import { h } from "preact";
import { StateUpdater, useState } from "preact/hooks";
import { Field, IField } from "../Field";
import { CarType, ICarType } from "./CarType";
import styles from "./CheckoutForm.module.css";
import { Button } from "src/client/shared/ui/Button";
import { DatePicker } from "src/client/shared/ui/DatePicker";
import { UserForm } from "./UserForm";
import { Modal } from "src/client/shared/ui/Modal";
import { OrderCreated } from "./OrderCreated";

export interface ICheckoutForm
  extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  orderText?: string;
  carTypeProps?: ICarType;
  radiusProps: Partial<IField>;
  quantityProps: Partial<IField>;
  validateCheckoutForm: () => boolean;
  checkoutDoneText: string;
  date?: string | null;
  setDate?: StateUpdater<string | null>;
  user: { name: string; phone: string } | null;
  setUser: StateUpdater<{ name: string; phone: string } | null>;
  onSubmit: () => void;
}

export function CheckoutForm({
  class: className,
  orderText = "Записаться",
  carTypeProps,
  radiusProps,
  quantityProps,
  validateCheckoutForm,
  checkoutDoneText,
  date,
  user,
  setDate,
  setUser,
  onSubmit,
}: ICheckoutForm) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <fieldset class={[styles.container, className].join(" ")}>
      {carTypeProps && <CarType class={styles.carType} {...carTypeProps} />}
      <Field
        title="Радиус колёс:"
        type={"number"}
        min={"12"}
        max={"23"}
        {...radiusProps}
      />
      <Field
        title="Количество колёс:"
        type={"number"}
        min={"1"}
        max={"6"}
        {...quantityProps}
      />
      <Button
        class={styles.submit}
        type={"button"}
        onClick={() => {
          if (validateCheckoutForm()) setModalOpen(true);
        }}
      >
        {orderText}
      </Button>
      {isModalOpen && (
        <Modal
          onClose={() => {
            if (setDate) setDate(null);
            setUser(null);
            setModalOpen(false);
          }}
        >
          {setDate && !date ? (
            <DatePicker setValue={setDate} />
          ) : !user ? (
            <UserForm setUser={setUser} onSubmit={onSubmit} />
          ) : (
            <OrderCreated
              text={checkoutDoneText}
              closeFunction={() => {
                onSubmit();
                if (setDate) setDate(null);
                setUser(null);
                setModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}
    </fieldset>
  );
}
