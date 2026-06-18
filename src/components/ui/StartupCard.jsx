"use client";

import React from "react";
import { Button } from "@heroui/react";

export default function StartupCard({ logo, name, founder, industry, members }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
      <div>
        {/* Startup Logo Container */}
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center mb-5">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Company Info */}
        <h3 className="text-[#002447] font-bold text-xl tracking-tight">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Founder: <span className="text-gray-700 font-medium">{founder}</span>
        </p>

        {/* Metadata Badges / Chips */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#e6f4f1] text-[#0f6c61]">
            {industry}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#edf2f7] text-[#4a5568]">
            {members} Members
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="bordered"
        className="w-full border border-[#0f6c61] text-[#0f6c61] hover:bg-[#0f6c61]/5 font-semibold text-[14px] h-[42px] rounded-xl transition-colors"
      >
        View Profile
      </Button>
    </div>
  );
}