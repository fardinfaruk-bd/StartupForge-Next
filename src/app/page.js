import HeroBanner from "@/components/Home/Banner";
import FeaturedStartups from "@/components/Home/FeaturedStartups";
import OpenOpportunities from "@/components/Home/OpenOpportunities";
import PlatformImpact from "@/components/Home/PlatformImpact";
import StatsSection from "@/components/Home/StatsSection";
import WhyJoin from "@/components/Home/WhyJoin";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <StatsSection />
      <FeaturedStartups />
      <OpenOpportunities />
      <WhyJoin />
      <PlatformImpact />
    </>
  );
}
