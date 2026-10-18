import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { getFeaturedStartups } from "@/lib/api/startup";
import AnimatedStartupGrid from "./AnimatedStartupGrid";

export default async function FeaturedStartups() {
  const startups = await getFeaturedStartups() || [];

  return (
    <section
      className="w-full overflow-hidden"
      style={{ background: "var(--sf-navy-mid)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#0DFFCA] inline-block" />
              Handpicked by our team
            </span>

            <h2 className="text-white font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
              Featured{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Startups
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-md">
              Vetted companies scaling their high-impact teams — ready for your skills.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/startups"
            className="inline-flex items-center gap-1.5 text-[#0DFFCA] font-semibold text-[15px] hover:opacity-80 transition-opacity shrink-0"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Animated Grid */}
        <AnimatedStartupGrid startups={startups} />
      </div>
    </section>
  );
}