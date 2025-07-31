import { Fragment } from "react/jsx-runtime";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ExamplesSection from "./ExamplesSection";
import TokenomicsSection from "./TokenomicsSection";
import RoadmapSection from "./RoadmapSection";
import VestingSection from "./VestingSection";
import TeamSection from "./TeamSection";

const Index = () => {
  return (
    <Fragment>
      <HeroSection />
      <FeaturesSection />
      <ExamplesSection />
      <TokenomicsSection />
      <RoadmapSection />
      <VestingSection />
      <TeamSection />
    </Fragment>
  );
};

export default Index;
