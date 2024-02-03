import { h } from "preact";
export function cn(
  ...classes: (
    | string
    | boolean
    | undefined
    | null
    | h.JSX.SignalLike<string | undefined>
  )[]
) {
  return classes.filter((c) => !!c).join(" ");
}
