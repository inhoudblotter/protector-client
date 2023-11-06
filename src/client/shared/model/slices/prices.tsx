import { createContext } from "preact";
import { useEffect, useState, useReducer, useContext } from "preact/hooks";
import { IProvider } from "../types/IProvider";
import { IPayloadAction } from "../types/IPayloadAction";
import { IState } from "../types/IState";

type IServicePrices = { [radius: number]: number };

type IServicesPrices = {
  complex: IServicePrices;
  removalAndInstalation: IServicePrices;
  dismantling: IServicePrices;
  instalation: IServicePrices;
  balancing: IServicePrices;
  storage: IServicePrices;
  addSpikes: IServicePrices;
  cut: IServicePrices;
  puncture: IServicePrices;
};

interface IPricesContext {
  passengerCar: IServicesPrices;
  suv: IServicesPrices;
}

const initialState: IPricesContext = {
  serviceClue: false,
};

export const CluesContext = createContext({
  value: initialState,
  setValue: (v: IClueContext) => {},
});

export function CluesProvider({ children }: IProvider) {
  const [value, setValue] = useState<IClueContext>({
    serviceClue: false,
  });
  useEffect(() => {
    const state = window.localStorage.getItem("clueContext");
    if (state) setValue(JSON.parse(state));
  }, []);
  return (
    <CluesContext.Provider value={{ value: value, setValue: setValue }}>
      {children}
    </CluesContext.Provider>
  );
}

export function CluesReducer(
  state: IState<IClueContext>,
  action: IPayloadAction<"setReceived", keyof IClueContext>
): IState<IClueContext> {
  if (action.type === "setReceived") {
    const newState = { ...state.value, [action.payload]: true };
    state.setValue(newState);
    window.localStorage.setItem("clueContext", JSON.stringify(newState));
  }
  return state;
}

export function useCluesContext() {
  const context = useContext(CluesContext);
  const [_, dispatch] = useReducer(CluesReducer, context);
  return { context: context.value, dispatch };
}
