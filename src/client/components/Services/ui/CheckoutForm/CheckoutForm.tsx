import { RefObject, h } from "preact";
import { StateUpdater, useState, useCallback } from "preact/hooks";
import { Field, IField } from "../Field";
import { CarType, ICarType } from "./CarType";
import styles from "./CheckoutForm.module.css";
import { Button } from "src/client/shared/ui/Button";
import { Modal } from "src/client/shared/ui/Modal";
import { IClient } from "src/client/shared/types/IClient";
import { ModalContent } from "./ModalContent";
import { IError } from "src/client/shared/types/IError";

export interface ICheckoutForm
  extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  orderText?: string;
  carTypeProps?: ICarType;
  radiusProps: Partial<IField>;
  quantityProps: Partial<IField>;
  validateCheckoutForm: () => boolean;
  checkoutDoneText: string;
  date?: string | null;
  services: string[];
  wheels: number;
  setDate?: StateUpdater<string | null>;
  user: IClient;
  setUser: StateUpdater<IClient>;
  errorOnSubmit: IError | null;
  setErrorOnSubmit: StateUpdater<IError | null>;
  clearError: () => void;
  isSuccess: boolean;
  isLoading: RefObject<boolean>;
  validateError: string | null;
  setValidateError: StateUpdater<string | null>;
  setSuccess: StateUpdater<boolean>;
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
  isLoading,
  clearError,
  errorOnSubmit,
  isSuccess,
  setErrorOnSubmit,
  services,
  wheels,
  validateError,
  setValidateError,
  setSuccess,
}: ICheckoutForm) {
  const [isModalOpen, setModalOpen] = useState(false);
  const onClose = useCallback(() => {
    if (setDate) setDate(null);
    setModalOpen(false);
    setSuccess(false);
  }, [setDate, setModalOpen, setSuccess]);
  return (
    <fieldset class={[styles.container, className].join(" ")}>
      {carTypeProps && <CarType class={styles.carType} {...carTypeProps} />}
      <Field
        title="Радиус колёс:"
        type={"number"}
        min={"12"}
        max={"24"}
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
        <Modal onClose={onClose} class={styles.modal}>
          <ModalContent
            date={date}
            services={services}
            setErrorOnSubmit={setErrorOnSubmit}
            wheels={wheels}
            setDate={setDate}
            user={user}
            setUser={setUser}
            isSuccess={isSuccess}
            checkoutDoneText={checkoutDoneText}
            onClose={onClose}
            errorOnSubmit={errorOnSubmit}
            clearError={clearError}
            isLoading={isLoading}
            validateError={validateError}
            setValidateError={setValidateError}
          />
        </Modal>
      )}
    </fieldset>
  );
}
