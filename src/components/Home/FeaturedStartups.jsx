import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { getFeaturedStartups } from "@/lib/api/startup";
import AnimatedStartupGrid from "./AnimatedStartupGrid";

export default async function FeaturedStartups() {
  const startups = await getFeaturedStartups() || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 bg-white overflow-hidden">
      {/* Header Section Layout */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-[#002447] font-bold text-3xl sm:text-4xl tracking-tight">
            Featured Startups
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Vetted companies scaling their high-impact teams.
          </p>
        </div>

        {/* View All Redirection Action */}
        <Link
          href="/startups"
          className="inline-flex items-center gap-1.5 text-[#0f6c61] font-semibold text-[15px] hover:opacity-80 transition-opacity"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Render the Framer Motion Client Grid Component */}
      <AnimatedStartupGrid startups={startups} />
    </section>
  );
}