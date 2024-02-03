import { BusinessCard } from "src/client/components/BusinessCard";
import { Hero } from "../../components/Hero";
import { Services } from "../../components/Services";
import { BasePage } from "../BasePage";
export function Home() {
  return (
    <BasePage>
      <Hero />
      <Services />
      <BusinessCard />
    </BasePage>
  );
}
