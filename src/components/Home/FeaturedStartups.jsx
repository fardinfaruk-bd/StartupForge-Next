
import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import StartupCard from "../ui/StartupCard";
import { getFeaturedStartups } from "@/lib/api/startup";
import StartupCardContainer from "./StartupCardContainer";

export default async function FeaturedStartups() {
  // Mock data perfectly matching your image mockup layout 
  const startups = await getFeaturedStartups();

  

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 bg-white">
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

      {/* Grid wrapper importing Child Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <StartupCardContainer key={startup._id} startup={startup} />
        ))}
      </div>
    </section>
  );
}