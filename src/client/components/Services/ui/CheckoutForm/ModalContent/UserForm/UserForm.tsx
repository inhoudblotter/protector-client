import { h } from "preact";
import { ChangeEvent, TargetedEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { Button } from "src/client/shared/ui/Button";
import { Input } from "src/client/shared/ui/Input";
import styles from "./UserForm.module.css";
import { Toast } from "src/client/shared/ui/Toast";
import { IClient } from "src/client/shared/types/IClient";
import { cn } from "src/client/shared/utils/cn";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";

interface IUserForm extends h.JSX.HTMLAttributes<HTMLFormElement> {
  setUser: (user: IClient) => void;
  isLoading: boolean;
}

export function UserForm({ setUser, isLoading }: IUserForm) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleChange =
    (setValue: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setValue(e.currentTarget.value);
    };
  function handleSubmit(e: TargetedEvent<HTMLButtonElement, Event>) {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const p = cleanPhone(phone.trim());
    const cn = carNumber.trim();
    if (!n && !p) {
      return setError("Необходимо ввести имя и телефон.");
    } else if (!n) {
      return setError("Необходимо ввести имя.");
    } else if (!p) {
      return setError("Необходимо ввести телефон.");
    } else if (!cn) {
      return setError("Необходимо ввести номер машины.");
    } else if (p.length !== 12) {
      return setError("Проверте правильность ввода номера телефона.");
    } else if (cn.length !== 6) {
      return setError("Проверьте правильность ввода номера машины");
    } else if (n.length > 100) {
      return setError("Имя дожно содержать менее 100 символов.");
    }
    setUser({ name: n, phone: p, carNumber: cn });
  }
  return (
    <div class={cn(styles.container, isLoading && styles.loading)}>
      <Input
        class={styles.input}
        placeholder={"Имя*"}
        name={"name"}
        value={name}
        maxLength={100}
        onChange={handleChange(setName)}
      />
      <Input
        class={styles.input}
        placeholder={"Телефон*"}
        name={"phone"}
        value={phone}
        maxLength={18}
        onChange={handleChange(setPhone)}
      />
      <Input
        class={styles.input}
        placeholder={"Номер авто*"}
        name={"car-number"}
        value={carNumber}
        maxLength={6}
        onChange={handleChange(setCarNumber)}
      />
      <Button
        class={styles.btn}
        disabled={!name.trim() || !phone.trim()}
        type={"button"}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Записаться
      </Button>
      <span class={styles.personalData}>
        Нажимаяя на кнопку вы соглашаетесь с политикой обработки персональных
        данных
      </span>
      {error && (
        <Toast
          message={error}
          class={styles.toast}
          onClose={() => setError(null)}
          type="error"
        />
      )}
    </div>
  );
}
