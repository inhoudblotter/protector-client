import { h } from "preact";
import { GroupItem } from "../ui/GroupItem";
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { formatTime } from "src/client/shared/utils/formatTime";
import { useRadiusField } from "../hooks/useRadiusField";
import { useQuantityField } from "../hooks/useQuantityField";
import { useCarTypeField } from "../hooks/useCarTypeFiled";
import { createOrder } from "src/client/shared/api/createOrder";
import { IClient } from "src/client/shared/types/IClient";
import { settingsContext } from "src/client/shared/model/slices/settings";
import { getDefaultPrice } from "../utils/getDefaultPrice";
import { FormLoader } from "../ui/FormLoader/FormLoader";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { IError } from "src/client/shared/types/IError";

type ITireFitting = h.JSX.HTMLAttributes<HTMLLIElement>;

export function TireFitting({ class: className }: ITireFitting) {
  const settings = useContext(settingsContext);
  const [complex, setComplex] = useState(true);
  const [removalAndInstalation, setRemovalAndInstalation] = useState(true);
  const [dismantling, setDismantling] = useState(true);
  const [instalation, setInstalation] = useState(true);
  const [balancing, setBalancing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [user, setUser] = useState<IClient | null>(null);
  const { radius, onChangeRadius } = useRadiusField();
  const { quantity, onChangeQuantity } = useQuantityField();
  const { carType, onChangeCarType } = useCarTypeField();
  const [isSuccess, setSuccess] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState<IError | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  useEffect(() => {
    if (complex) {
      setServices(["complex"]);
    } else {
      setServices(
        Object.entries({
          removalAndInstalation,
          dismantling,
          instalation,
          balancing,
        })
          .filter((v) => v[1])
          .map((v) => v[0])
      );
    }
  }, [complex, dismantling, instalation, balancing, removalAndInstalation]);
  const onChangeComplex = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setComplex(checked);
      if (checked) {
        [
          setRemovalAndInstalation,
          setDismantling,
          setInstalation,
          setBalancing,
        ].forEach((f) => f(true));
      }
    },
    [setComplex, setRemovalAndInstalation]
  );

  const onChangeOtherService = useCallback(
    (setValue: (v: boolean) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setValue(checked);
      if (!checked) setComplex(false);
    },
    [setComplex]
  );

  function validateCheckoutForm() {
    setError(null);
    if (
      ![
        complex,
        removalAndInstalation,
        dismantling,
        instalation,
        balancing,
      ].some((s) => !!s)
    ) {
      setError("Выбирите услугу");
      return false;
    } else if (![carType, radius, quantity].every((p) => !!p)) {
      setError("Заполните данные о автомобиле");
      return false;
    }
    return true;
  }

  const checkoutDoneText = useMemo(() => {
    if (!date) return "";
    const temp = new Date(date);
    const [day, hours, minutes] = [
      temp.getDate(),
      temp.getHours(),
      temp.getMinutes(),
    ];
    return `Ждём вас ${day} числа в ${formatTime(hours)}:${formatTime(
      minutes
    )}.`;
  }, [date]);

  const onSubmit = useCallback(() => {
    if (user && date) {
      setErrorOnSubmit(null);
      setLoading(true);
      let services;
      if (complex) {
        services = ["complex"];
      } else {
        services = Object.entries({
          removalAndInstalation,
          dismantling,
          instalation,
          balancing,
        })
          .filter((v) => v[1])
          .map((v) => v[0]);
      }
      createOrder({
        client: {
          ...user,
          carType: carType || undefined,
        },
        services,
        date,
        wheels: {
          radius,
          quantity,
        },
      })
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          if (isError(error)) {
            setErrorOnSubmit(error);
          } else {
            setErrorOnSubmit({ code: 500, message: "Что-то пошло не так..." });
            throw error;
          }
        })
        .finally(() => setLoading(false));
    }
  }, [
    user,
    complex,
    removalAndInstalation,
    dismantling,
    instalation,
    balancing,
    date,
    carType,
    radius,
    quantity,
    setSuccess,
    setErrorOnSubmit,
  ]);
  useEffect(() => {
    if (user) onSubmit();
  }, [user, onSubmit]);
  if (!settings) return <FormLoader title="Переобувка" />;
  return (
    <>
      <GroupItem
        title="Переобувка"
        class={className}
        servicesProps={{
          services: [
            {
              title: "Комплекс",
              descr:
                "В услугу входит: снятие, демонтаж, монтаж, балансировка и установка.",
              price: getDefaultPrice(
                settings.services.complex.prices,
                quantity,
                carType,
                radius
              ),
              checked: complex,
              onChange: onChangeComplex,
            },
            {
              title: "Снятие и установка",
              price: getDefaultPrice(
                settings.services.removalAndInstalation.prices,
                quantity,
                carType,
                radius
              ),
              checked: removalAndInstalation,
              onChange: onChangeOtherService(setRemovalAndInstalation),
              lighten: complex,
            },
            {
              title: "Демонтаж",
              price: getDefaultPrice(
                settings.services.dismantling.prices,
                quantity,
                carType,
                radius
              ),
              checked: dismantling,
              onChange: onChangeOtherService(setDismantling),
              lighten: complex,
            },
            {
              title: "Монтаж",
              price: getDefaultPrice(
                settings.services.instalation.prices,
                quantity,
                carType,
                radius
              ),
              checked: instalation,
              onChange: onChangeOtherService(setInstalation),
              lighten: complex,
            },
            {
              title: "Балансировка",
              price: getDefaultPrice(
                settings.services.balancing.prices,
                quantity,
                carType,
                radius
              ),
              checked: balancing,
              onChange: onChangeOtherService(setBalancing),
              lighten: complex,
            },
          ],
        }}
        error={error ? { message: error, clean: () => setError(null) } : null}
        checkoutProps={{
          carTypeProps: { setValue: onChangeCarType },
          radiusProps: { value: radius, onChange: onChangeRadius },
          quantityProps: { value: quantity, onChange: onChangeQuantity },
          validateCheckoutForm,
          services,
          wheels: quantity,
          setErrorOnSubmit,
          errorOnSubmit,
          clearError: () => setErrorOnSubmit(null),
          date,
          setDate,
          user,
          setUser,
          isSuccess,
          checkoutDoneText,
          isLoading,
          onSubmit,
        }}
      />
    </>
  );
}
