import { h } from "preact";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

type IBasePage = h.JSX.HTMLAttributes<HTMLElement>;

export function BasePage({ children }: IBasePage) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
