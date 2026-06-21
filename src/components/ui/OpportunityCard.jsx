import React from "react";
import { Button } from "@heroui/react";
import { Layers, Code, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";

export default function OpportunityCard({ opportunity }) {

  // Dynamic styling mapping for the top left category badges
  const badgeStyles = {
    remote: "bg-[#fee2e2] text-[#ef4444]", // Soft red
    onsite: "bg-[#e6f4f1] text-[#0f6c61]", // Soft teal
    featured: "bg-[#e0e7ff] text-[#4f46e5]" // Soft purple/blue
  };

  const today = new Date();
  const expireDate = new Date(opportunity?.deadline);

  // Time difference in milliseconds
  const diffTime = expireDate - today;

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));




  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow duration-300">
      <div>
        {/* Top Header Layer: Badges & Expiry */}
        <div className="flex items-center justify-between w-full mb-5">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${badgeStyles[opportunity?.workType] || badgeStyles.featured}`}>
            {opportunity?.workType.charAt(0).toUpperCase() + opportunity?.workType.slice(1)}
          </span>
          <span className="text-gray-450 text-xs font-medium text-gray-500">
            Exp. {diffDays} Days
          </span>
        </div>

        {/* Role & Company Header */}
        <h3 className="text-[#002447] font-bold text-xl md:text-2xl tracking-tight leading-snug">
          {opportunity?.roleTitle}
        </h3>
        {/* <p className="text-[#0f6c61] font-semibold text-sm mt-1">
          {opportunities?.companyName}
        </p> */}

        {/* Info Rows (Skills & Compensation) */}
        <div className="mt-6 space-y-3 mb-6">
          <div className="flex items-center gap-2.5 text-gray-600 text-sm md:text-[15px]">

            <span className="truncate">{opportunity?.requiredSkills}</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600 text-sm md:text-[15px]">
            <DollarSign size={16} className="text-gray-400 shrink-0" />
            <span>{opportunity?.minSalary} - {opportunity?.maxSalary}</span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <Link href={`/opportunities/${opportunity?._id}`}>
        <Button
          className="w-full bg-[#051124] text-white hover:bg-[#0c1a30] font-semibold text-[14px] h-[44px] rounded-xl transition-colors"
        >
          Apply Now
        </Button>
      </Link>
    </div>
  );
}