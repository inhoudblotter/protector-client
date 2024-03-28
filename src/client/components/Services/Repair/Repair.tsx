import { h } from "preact";
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from "preact/hooks";
import { GroupItem } from "../ui/GroupItem";
import { ChangeEvent } from "preact/compat";
import { useCarTypeField } from "../hooks/useCarTypeFiled";
import { useQuantityField } from "../hooks/useQuantityField";
import { useRadiusField } from "../hooks/useRadiusField";
import { formatTime } from "src/client/shared/utils/formatTime";
import { IClient } from "src/client/shared/types/IClient";
import { createOrder } from "src/client/shared/api/createOrder";
import { settingsContext } from "src/client/shared/model/slices/settings";
import { FormLoader } from "../ui/FormLoader/FormLoader";
import { getMinMaxPrice } from "../utils/getMinMaxPrice";
import { getDefaultPrice } from "../utils/getDefaultPrice";
import { IError } from "src/client/shared/types/IError";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { validateUserFields } from "../utils/validateUserFields";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";

type IRepair = h.JSX.HTMLAttributes<HTMLLIElement>;

export function Repair({ class: className }: IRepair) {
  const settings = useContext(settingsContext);
  const [addSpikes, setAddSpikes] = useState(false);
  const [cut, setCut] = useState(false);
  const [puncture, setPuncture] = useState(false);
  const [removalAndInstalation, setRemovalAndInstalation] = useState(true);
  const { carType, onChangeCarType } = useCarTypeField();
  const { quantity, onChangeQuantity } = useQuantityField(1);
  const { radius, onChangeRadius } = useRadiusField();
  const [date, setDate] = useState<string | null>(null);
  const [user, setUser] = useState<IClient>({
    name: "",
    phone: "",
    carNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [errorOnSubmit, setErrorOnSubmit] = useState<IError | null>(null);
  const isLoading = useRef(false);
  const [validateError, setValidateError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const onChange = useCallback(
    (setValue: (v: boolean) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.checked);
    },
    []
  );

  function validateCheckoutForm() {
    if ([addSpikes, puncture, cut, removalAndInstalation].every((el) => !el)) {
      setError("Выберите услугу");
      return false;
    } else if ([carType, radius].some((el) => !el)) {
      setError("Заполните данные о машине");
      return false;
    }
    return true;
  }

  const checkoutDoneText = useMemo(() => {
    if (!date) return "Что-то пошло не так...";
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
  useEffect(() => {
    setServices(
      Object.entries({
        addSpikes,
        cut,
        puncture,
        removalAndInstalation,
      })
        .filter((v) => v[1])
        .map((v) => v[0])
    );
  }, [addSpikes, cut, puncture, removalAndInstalation]);
  const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (isLoading.current) return;
      if (!date) return setValidateError("Необходимо выбрать дату.");
      if (!carType)
        return setValidateError("Необходимо выбрать тип автомобиля.");
      const name = user.name.trim();
      const phone = cleanPhone(user.phone.trim());
      const carNumber = user.carNumber.trim();
      const vm = validateUserFields(name, phone, carNumber);
      if (vm) return setValidateError(vm);
      isLoading.current = true;

      createOrder({
        client: {
          name,
          phone,
          carNumber,
          carType,
        },
        services,
        date,
        wheels: {
          radius,
          quantity,
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
        .finally(() => (isLoading.current = false));
    },
    [
      user,
      carType,
      services,
      date,
      radius,
      quantity,
      setSuccess,
      isLoading,
      setErrorOnSubmit,
    ]
  );
  if (!settings) return <FormLoader title="Ремонт" />;
  return (
    <GroupItem
      title="Ремонт"
      class={className}
      onSubmit={onSubmit}
      id={"repair"}
      servicesProps={{
        services: [
          {
            title: "Дошиповка",
            price: getMinMaxPrice(
              settings.services.addSpikes.prices,
              quantity,
              carType,
              radius
            ),
            checked: addSpikes,
            onChange: onChange(setAddSpikes),
          },
          {
            title: "Ремонт пореза",
            price: getDefaultPrice(
              settings.services.cut.prices,
              quantity,
              carType,
              radius
            ),
            checked: cut,
            onChange: onChange(setCut),
          },
          {
            title: "Ремонт прокола",
            price: getDefaultPrice(
              settings.services.puncture.prices,
              quantity,
              carType,
              radius
            ),
            checked: puncture,
            onChange: onChange(setPuncture),
          },
          {
            title: "Монтаж и демонтаж",
            price: getDefaultPrice(
              settings.services.removalAndInstalation.prices,
              quantity,
              carType,
              radius
            ),
            checked: removalAndInstalation,
            onChange: onChange(setRemovalAndInstalation),
          },
        ],
      }}
      error={error ? { message: error, clean: () => setError(null) } : null}
      checkoutProps={{
        carTypeProps: { setValue: onChangeCarType },
        radiusProps: { value: radius, onChange: onChangeRadius },
        quantityProps: { value: quantity, onChange: onChangeQuantity },
        user,
        setUser,
        setErrorOnSubmit,
        errorOnSubmit,
        clearError: () => setErrorOnSubmit(null),
        isLoading,
        isSuccess,
        services,
        wheels: quantity,
        date,
        setDate,
        validateCheckoutForm,
        checkoutDoneText,
        validateError,
        setValidateError,
        setSuccess,
      }}
    />
  );
}
