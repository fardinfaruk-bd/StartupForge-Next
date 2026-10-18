import StartupFiltersContainer from "@/components/startups/StartupsFiltersContainer";
import { getAllStartups } from "@/lib/api/startup";
import React from "react";

export const metadata = {
  title: "Startups | StartupForge",
  description: "Explore active innovations and companies forging ahead on StartupForge.",
};

const page = async ({ searchParams }) => {
  const filters = await searchParams;

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  const { startups, total } = await getAllStartups(queryString);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Info Section */}
      <div className="mb-10 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border mb-3"
            style={{
              background: "rgba(13,255,202,0.08)",
              borderColor: "rgba(13,255,202,0.2)",
              color: "#0DFFCA",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0DFFCA] inline-block" />
            Verified Ecosystem
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Explore{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Startups
            </span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Discover active innovations and companies forging ahead.
          </p>
        </div>

        {/* Counter Badge */}
        <span
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit self-start sm:self-center border"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "#0DFFCA",
          }}
        >
          {startups?.length} Active {startups?.length === 1 ? "Company" : "Companies"}
        </span>
      </div>

      <StartupFiltersContainer
        startups={startups}
        total={total}
        filters={filters}
      />
    </div>
  );
};

export default page;