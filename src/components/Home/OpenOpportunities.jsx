import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { getOpenOpportunities } from "@/lib/api/opportunities";
import AnimatedOpportunityGrid from "./AnimatedOpportunityGrid";

export default async function OpenOpportunities() {
  const opportunities = await getOpenOpportunities("status=active") || [];

  return (
    <section className="w-full bg-[#f0f5ff] py-16 px-6 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Layout Component */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[#002447] font-bold text-3xl sm:text-4xl tracking-tight">
              Open Opportunities
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2 font-normal">
              Join a mission that matters with these featured roles.
            </p>
          </div>

          {/* Replaced Search Field with View All Anchor */}
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-[#0f6c61] font-semibold text-[15px] hover:opacity-85 transition-opacity"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Dynamic Framer Motion Animated Grid Engine */}
        <AnimatedOpportunityGrid opportunities={opportunities} />

      </div>
    </section>
  );
}