import { RefObject, h } from "preact";
import { StateUpdater } from "preact/hooks";
import { Button } from "src/client/shared/ui/Button";
import { Input } from "src/client/shared/ui/Input";
import styles from "./UserForm.module.css";
import { Toast } from "src/client/shared/ui/Toast";
import { IClient } from "src/client/shared/types/IClient";
import { cn } from "src/client/shared/utils/cn";
import { Close } from "src/client/shared/ui/icons";

interface IUserForm extends h.JSX.HTMLAttributes<HTMLFormElement> {
  date?: string | null;
  setDate?: StateUpdater<string | null>;
  user: IClient;
  setUser: (user: IClient) => void;
  isLoading: RefObject<boolean>;
  validateError: string | null;
  setValidateError: StateUpdater<string | null>;
}

export function UserForm({
  date,
  setDate,
  setUser,
  isLoading,
  user,
  validateError,
  setValidateError,
}: IUserForm) {
  return (
    <div class={cn(styles.container, isLoading && styles.loading)}>
      {date && setDate && (
        <Button onClick={() => setDate(null)} class={styles.date}>
          <span>
            {new Date(date).toLocaleString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "short",
            })}
          </span>
          <Close />
        </Button>
      )}
      <Input
        class={styles.input}
        placeholder={"Имя*"}
        name={"name"}
        value={user.name}
        maxLength={100}
        onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
      />
      <Input
        class={styles.input}
        placeholder={"Телефон*"}
        name={"phone"}
        value={user.phone}
        maxLength={18}
        onChange={(e) => setUser({ ...user, phone: e.currentTarget.value })}
      />
      <Input
        class={styles.input}
        placeholder={"Номер авто*"}
        name={"car-number"}
        value={user.carNumber}
        maxLength={6}
        onChange={(e) => setUser({ ...user, carNumber: e.currentTarget.value })}
      />
      <Button
        class={styles.btn}
        disabled={
          !user.name.trim() || !user.phone.trim() || !user.carNumber?.trim()
        }
        type={"submit"}
        isLoading={isLoading.current || undefined}
      >
        Записаться
      </Button>
      <span class={styles.personalData}>
        Нажимаяя на кнопку вы соглашаетесь с{" "}
        <a href={"/personal-data-terms"} target={"_blank"} rel="noreferrer">
          политикой обработки персональных данных
        </a>
      </span>
      {validateError && (
        <Toast
          message={validateError}
          class={styles.toast}
          onClose={() => setValidateError(null)}
          type="error"
        />
      )}
    </div>
  );
}
