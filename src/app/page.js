import HeroBanner from "@/components/Home/Banner";
import FeaturedStartups from "@/components/Home/FeaturedStartups";
import OpenOpportunities from "@/components/Home/OpenOpportunities";
import PlatformImpact from "@/components/Home/PlatformImpact";
import StatsSection from "@/components/Home/StatsSection";
import WhyJoin from "@/components/Home/WhyJoin";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";
import { loadPublicStats } from "@/lib/api/stats";

export const metadata = {
  title: "StartupForge — Find Your Next Startup Job",
  description:
    "Browse 500+ open roles at high-growth startups. StartupForge connects top talent with visionary founders building the future.",
};

export default async function Home() {
  const rawStats = await loadPublicStats();

  return (
    <>
      <HeroBanner />
      <StatsSection rawStats={rawStats} />
      <FeaturedStartups />
      <OpenOpportunities />
      <WhyJoin />
      <HowItWorks />
      <Testimonials />
      <PlatformImpact rawStats={rawStats} />
    </>
  );
}

