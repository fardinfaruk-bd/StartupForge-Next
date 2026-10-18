import OpportunityFiltersContainer from "@/components/opportunities/OpportunityFiltersContainer";
import { getAllOpportunities } from "@/lib/api/opportunities";
import React from "react";

export const metadata = {
  title: "Opportunities | StartupForge",
  description:
    "Explore exciting roles from innovative startups and growing teams on StartupForge.",
};

const OpportunitiesPage = async ({ searchParams }) => {
  const filters = await searchParams;

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  const { opportunities, total } = await getAllOpportunities(queryString);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="my-8 text-center">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border mb-4"
          style={{
            background: "rgba(13,255,202,0.08)",
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
          Active Positions
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Discover Your Next{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Opportunity
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-400">
          Explore exciting roles from innovative startups and growing teams. Find
          the opportunity that matches your skills, goals, and passion.
        </p>
      </div>

      <OpportunityFiltersContainer
        opportunities={opportunities || []}
        total={total}
        filters={filters}
      />
    </div>
  );
};

export default OpportunitiesPage;