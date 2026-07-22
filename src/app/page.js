import HeroBanner from "@/components/Home/Banner";
import FeaturedStartups from "@/components/Home/FeaturedStartups";
import OpenOpportunities from "@/components/Home/OpenOpportunities";
import PlatformImpact from "@/components/Home/PlatformImpact";
import StatsSection from "@/components/Home/StatsSection";
import WhyJoin from "@/components/Home/WhyJoin";
import { loadPublicStats } from "@/lib/api/stats";

export default async function Home() {

  const rawStats = await loadPublicStats();
  
  return (
    <>
      <HeroBanner />
      <StatsSection  rawStats={rawStats}/>
      <FeaturedStartups />
      <OpenOpportunities />
      <WhyJoin />
      <PlatformImpact rawStats={rawStats}/>
    </>
  );
}
