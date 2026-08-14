import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { SelectedWork } from "@/components/sections/selected-work";
import { CreativeTech } from "@/components/sections/creative-tech";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { TechStack } from "@/components/sections/tech-stack";
import { WhyBhavya } from "@/components/sections/why-bhavya";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <SelectedWork />
      <CreativeTech />
      <WhatIBuild />
      <TechStack />
      <WhyBhavya />
      <Faq />
      <FinalCta />
    </>
  );
}
