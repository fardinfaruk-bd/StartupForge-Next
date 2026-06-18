import React from "react";
import { TrendingUp } from "lucide-react";

export default function PlatformImpact() {
  return (
    <section className="w-full bg-[#f0f5ff] py-16 px-6 flex justify-center items-center">
      <div className="w-full max-w-7xl mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-[#002447] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight">
            Platform Growth & Impact
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3 font-normal">
            Real-time insights into the StartupForge ecosystem.
          </p>
        </div>

        {/* Cards Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          
          {/* Card 1: Active Startups */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]">
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              ACTIVE STARTUPS
            </span>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                2,450+
              </span>
              <span className="text-[#0f6c61] font-bold text-xs">
                +12%
              </span>
            </div>
          </div>

          {/* Card 2: Total Opportunities */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]">
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              TOTAL OPPORTUNITIES
            </span>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                8,900+
              </span>
              <span className="px-2 py-0.5 text-[11px] font-bold text-[#0f6c61] bg-[#e6f4f1] rounded-md">
                New
              </span>
            </div>
          </div>

          {/* Card 3: Total Funding Raised */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]">
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              TOTAL FUNDING RAISED
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                $4.2B+
              </span>
              <TrendingUp size={20} className="text-[#0f6c61]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Card 4: Successful Matches */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]">
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              SUCCESSFUL MATCHES
            </span>
            <div className="flex flex-col mt-2">
              <span className="text-[#002447] font-bold text-3xl tracking-tight">
                15,000+
              </span>
              <span className="text-gray-500 font-semibold text-xs mt-1">
                +500 this month
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}