import { h } from "preact";
import { ChangeEvent, TargetedEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { Button } from "src/client/shared/ui/Button";
import { Input } from "src/client/shared/ui/Input";
import styles from "./UserForm.module.css";
import { Toast } from "src/client/shared/ui/Toast";

interface IUserForm extends h.JSX.HTMLAttributes<HTMLFormElement> {
  setUser: (user: { name: string; phone: string }) => void;
}

export function UserForm({ setUser }: IUserForm) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleChange =
    (setValue: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setValue(e.currentTarget.value);
    };
  function handleSubmit(e: TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const p = phone.trim();
    if (!n && !p) {
      return setError("Необходимо ввести имя и телефон");
    } else if (!n) {
      return setError("Необходимо ввести имя");
    } else if (!p) {
      return setError("Необходимо ввести телефон");
    }
    setUser({ name: n, phone: p });
  }
  return (
    <form class={styles.container} onSubmit={handleSubmit}>
      <Input
        class={styles.input}
        placeholder={"Имя*"}
        name={"name"}
        value={name}
        onChange={handleChange(setName)}
      />
      <Input
        class={styles.input}
        placeholder={"Телефон*"}
        name={"phone"}
        value={phone}
        onChange={handleChange(setPhone)}
      />
      <Button class={styles.btn} disabled={!name.trim() || !phone.trim()}>
        Записаться
      </Button>
      <span class={styles.personalData}>
        Нажимаяя на кнопку вы соглашаетесь с политикой обработки персональных
        данных
      </span>
    </form>
  );
}
