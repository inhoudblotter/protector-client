import { h } from "preact";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface IBasePage extends h.JSX.HTMLAttributes<HTMLElement> {}

export function BasePage({ children }: IBasePage) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
