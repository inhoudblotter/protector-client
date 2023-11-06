import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import styles from "./GroupItem.module.css";
import { Accordion } from "../Accordion";
import { IServicesList, ServicesList } from "../ServicesList";
import { CheckoutForm, ICheckoutForm } from "../CheckoutForm";
import { useCluesContext } from "src/client/shared/model/slices/clues";
import { Toast } from "src/client/shared/ui/Toast";

export interface IGroupItem extends h.JSX.HTMLAttributes<HTMLFormElement> {
  title: string;
  checkoutProps: ICheckoutForm;
  servicesProps: IServicesList;
  error?: { message: string; clean: () => void } | null;
}

export function GroupItem({
  title,
  checkoutProps,
  servicesProps,
  class: className,
  error,
  onSubmit,
}: IGroupItem) {
  const { context: cluesContext, dispatch: cluesDispatch } = useCluesContext();

  const [showClue, setShowClue] = useState(false);
  const onOpen = useCallback(() => {
    if (!cluesContext.serviceClue && !showClue) setShowClue(true);
  }, [setShowClue, showClue, cluesContext.serviceClue]);

  return (
    <li class={[styles.item, className].join(" ")}>
      <Accordion title={title} onOpen={onOpen}>
        <form class={styles.form} onSubmit={onSubmit}>
          <ServicesList class={styles.services} {...servicesProps} />
          <CheckoutForm class={styles.checkout} {...checkoutProps} />
          {showClue && (
            <Toast
              class={styles.toast}
              message="Введите данные, чтобы узнать стоимость."
              onClose={() => {
                cluesDispatch({ type: "setReceived", payload: "serviceClue" });
                setShowClue(false);
              }}
            />
          )}
          {error && (
            <Toast
              type="error"
              class={styles.toast}
              message={error.message}
              onClose={error.clean}
            />
          )}
        </form>
      </Accordion>
    </li>
  );
}
