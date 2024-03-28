import { BusinessCard } from "src/client/components/BusinessCard";
import { Hero } from "../../components/Hero";
import { Services } from "../../components/Services";
import { BasePage } from "../BasePage";
import { MetaNav } from "src/client/components/MetaNav";

export default function Home() {
  return (
    <BasePage>
      <MetaNav />
      <Hero />
      <Services />
      <BusinessCard />
    </BasePage>
  );
}
