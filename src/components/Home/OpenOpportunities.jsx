import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { getOpenOpportunities } from "@/lib/api/opportunities";
import AnimatedOpportunityGrid from "./AnimatedOpportunityGrid";

export default async function OpenOpportunities() {
  const opportunities = await getOpenOpportunities("status=active") || [];

  return (
    <section
      className="w-full py-20 px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "var(--sf-navy)" }}
    >
      <div className="w-full max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border mb-4"
              style={{
                background: "rgba(13,255,202,0.07)",
                borderColor: "rgba(13,255,202,0.2)",
                color: "#0DFFCA",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#0DFFCA" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#0DFFCA" }}
                />
              </span>
              Live Now
            </span>

            <h2 className="text-white font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
              Open{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Opportunities
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-md">
              Join a mission that matters — these featured roles are actively hiring.
            </p>
          </div>

          {/* View All link */}
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-[#0DFFCA] font-semibold text-[15px] hover:opacity-85 transition-opacity shrink-0"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Interactive Filter Pills & Animated Grid */}
        <AnimatedOpportunityGrid opportunities={opportunities} />
      </div>
    </section>
  );
}