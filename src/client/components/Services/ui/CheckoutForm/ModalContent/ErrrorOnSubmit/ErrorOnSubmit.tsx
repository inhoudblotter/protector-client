import styles from "./ErrorOnSubmit.module.css";
import { Button } from "src/client/shared/ui/Button";
import { h } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { settingsContext } from "src/client/shared/model/slices/settings";
import { formatPhone } from "src/client/shared/utils/formatPhone";
import { IError } from "src/client/shared/types/IError";
interface IErrorOnSubmit extends h.JSX.HTMLAttributes<HTMLDivElement> {
  error: IError;
  clearError: () => void;
}

export function ErrorOnSubmit({ error, clearError }: IErrorOnSubmit) {
  const settings = useContext(settingsContext);
  const solution = useMemo(() => {
    if ((error.code === 500 || error.code === 400) && settings) {
      return (
        <span class={styles.text}>
          Повторите попытку или запишитесь по телефону:
          <a href={`tel:${settings.phone}`}>{formatPhone(settings.phone)}</a>
        </span>
      );
    } else if ((error.code === 500 || error.code === 400) && !settings) {
      return (
        <span class={styles.text}>
          Повторите попытку или запишитесь по телефону.
        </span>
      );
    }
    return null;
  }, [error.code, settings]);
  return (
    <div class={styles.container}>
      <span class={styles.text}>{error.message}</span>
      {solution}
      <Button class={styles.btn} onClick={clearError}>
        Назад
      </Button>
    </div>
  );
}
