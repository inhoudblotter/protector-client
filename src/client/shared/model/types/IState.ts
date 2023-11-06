export interface IState<T> {
  value: T;
  setValue: (v: T) => void;
}
