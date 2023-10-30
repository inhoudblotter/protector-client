import { h } from "preact";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function BasePage({ children }: h.JSX.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
