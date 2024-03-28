import { h } from "preact";
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { GroupItem } from "../ui/GroupItem";
import { useQuantityField } from "../hooks/useQuantityField";
import { useRadiusField } from "../hooks/useRadiusField";
import { IClient } from "src/client/shared/types/IClient";
import { createOrder } from "src/client/shared/api/createOrder";
import { FormLoader } from "../ui/FormLoader/FormLoader";
import { settingsContext } from "src/client/shared/model/slices/settings";
import { IPrice } from "src/client/shared/types/IPrices";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { IError } from "src/client/shared/types/IError";
import { validateUserFields } from "../utils/validateUserFields";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";

type IStorage = h.JSX.HTMLAttributes<HTMLLIElement>;

function getPrice(prices: IPrice, wheels: number, radius: number) {
  if (wheels && !radius) {
    return `от ${prices[12] * wheels} до ${prices[21] * wheels}`;
  } else if (!wheels && radius) {
    return `${prices[radius]}`;
  } else if (wheels && radius) {
    return `${prices[radius] * wheels}`;
  }
  return `от ${prices[12]} до ${prices[21]}`;
}

export function Storage({ class: className }: IStorage) {
  const settings = useContext(settingsContext);
  const [user, setUser] = useState<IClient>({
    name: "",
    phone: "",
    carNumber: "",
  });
  const [error, setError] = useState<null | string>(null);
  const { quantity, onChangeQuantity } = useQuantityField();
  const { radius, onChangeRadius } = useRadiusField();
  const [errorOnSubmit, setErrorOnSubmit] = useState<IError | null>(null);
  const isLoading = useRef(false);
  const [isSuccess, setSuccess] = useState(false);
  const [validateError, setValidateError] = useState<string | null>(null);
  const checkoutDoneText = useMemo(() => {
    if (!settings) return "";
    return `Ждём вас с ${settings.work_time.from.hours
      .toString()
      .padStart(2, "0")}:${settings.work_time.from.minutes
      .toString()
      .padStart(2, "0")} до ${settings.work_time.to.hours
      .toString()
      .padStart(2, "0")}:${settings.work_time.to.minutes
      .toString()
      .padStart(2, "0")} по адресу ул. ${settings.address.street} д. ${
      settings.address.house
    }`;
  }, [settings]);
  function validateCheckoutForm() {
    if (!quantity || !radius) {
      setError("Выберите количество колёс и радиус.");
      return false;
    }
    return true;
  }

  const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (isLoading.current) return;
      const name = user.name.trim();
      const phone = cleanPhone(user.phone.trim());
      const ve = validateUserFields(name, phone, "a000aa");
      if (ve) return setValidateError(ve);
      isLoading.current = true;
      setErrorOnSubmit(null);
      createOrder({
        client: {
          name,
          phone,
          carNumber: "",
        },
        services: ["storage"],
        wheels: {
          quantity,
          radius,
        },
      })
        .then((id) => {
          if (id) {
            setSuccess(true);
          } else throw new Error("Failed to create record.");
        })
        .catch((error) => {
          if (isError(error)) {
            setErrorOnSubmit(error);
          } else {
            setErrorOnSubmit({ code: 500, message: "Что-то пошло не так..." });
            throw error;
          }
        })
        .finally(() => isLoading.current);
    },
    [user, setErrorOnSubmit, quantity, radius, setSuccess, isLoading]
  );

  if (!settings) return <FormLoader title="Хранение" />;
  return (
    <GroupItem
      id={"storage"}
      onSubmit={onSubmit}
      title="Хранение"
      class={className}
      error={error ? { message: error, clean: () => setError(null) } : null}
      servicesProps={{
        services: [
          {
            title: "Сезонное хранение шин",
            price: getPrice(settings.services.storage.prices, quantity, radius),
            checkbox: false,
          },
        ],
      }}
      checkoutProps={{
        orderText: "Забронировать",
        radiusProps: { value: radius, onChange: onChangeRadius },
        quantityProps: { value: quantity, onChange: onChangeQuantity },
        validateCheckoutForm,
        user,
        setUser,
        services: ["storage"],
        wheels: quantity,
        setErrorOnSubmit,
        errorOnSubmit,
        clearError: () => setErrorOnSubmit(null),
        isLoading,
        isSuccess,
        checkoutDoneText,
        validateError,
        setValidateError,
        setSuccess,
      }}
    />
  );
}
