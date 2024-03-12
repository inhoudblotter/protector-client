import { IClient } from "src/client/shared/types/IClient";
import { DatePicker } from "./DatePicker";
import { UserForm } from "./UserForm";
import { OrderCreated } from "./OrderCreated";
import { StateUpdater } from "preact/hooks";
import { ErrorOnSubmit } from "./ErrrorOnSubmit";
import { IError } from "src/client/shared/types/IError";

interface IModalContent {
  date?: string | null;
  services: string[];
  wheels: number;
  setDate?: StateUpdater<string | null>;
  user: IClient | null;
  setUser: StateUpdater<IClient | null>;
  isSuccess: boolean;
  checkoutDoneText: string;
  errorOnSubmit: IError | null;
  setErrorOnSubmit: StateUpdater<IError | null>;
  clearError: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function ModalContent({
  date,
  setDate,
  setUser,
  isSuccess,
  checkoutDoneText,
  onClose,
  setErrorOnSubmit,
  errorOnSubmit,
  clearError,
  isLoading,
  services,
  wheels,
}: IModalContent) {
  if (setDate && !date)
    return (
      <DatePicker
        setError={setErrorOnSubmit}
        setValue={setDate}
        services={services}
        wheels={wheels}
      />
    );
  if (errorOnSubmit)
    return <ErrorOnSubmit error={errorOnSubmit} clearError={clearError} />;
  if (isSuccess)
    return <OrderCreated text={checkoutDoneText} closeFunction={onClose} />;
  return (
    <UserForm
      date={date}
      setDate={setDate}
      setUser={setUser}
      isLoading={isLoading}
    />
  );
}
