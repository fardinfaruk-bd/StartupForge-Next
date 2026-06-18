import React from "react";
import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import OpportunityCard from "../ui/OpportunityCard";

export default function OpenOpportunities() {
  const opportunities = [
    {
      id: 1,
      badgeText: "Urgent",
      badgeType: "urgent",
      expiryDays: 12,
      roleTitle: "Lead Product Designer",
      companyName: "TechNova Solutions",
      skills: "UI/UX, Figma, Design Systems",
      salary: "$140k - $180k + Equity",
      iconType: "design"
    },
    {
      id: 2,
      badgeText: "Featured",
      badgeType: "featured",
      expiryDays: 24,
      roleTitle: "Fullstack Engineer",
      companyName: "EcoStream",
      skills: "Next.js, Go, PostgreSQL",
      salary: "$130k - $160k + Equity",
      iconType: "engineering"
    },
    {
      id: 3,
      badgeText: "Remote",
      badgeType: "remote",
      expiryDays: 8,
      roleTitle: "Head of Growth",
      companyName: "QuantumPay",
      skills: "Marketing, Data Analysis, SEO",
      salary: "$150k - $200k + Equity",
      iconType: "growth"
    }
  ];

  return (
    <section className="w-full bg-[#f0f5ff] py-16 px-6 flex justify-center items-center">
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
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-[#0f6c61] font-semibold text-[15px] hover:opacity-85 transition-opacity"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Responsive Layout Grid Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((role) => (
            <OpportunityCard
              key={role.id}
              badgeText={role.badgeText}
              badgeType={role.badgeType}
              expiryDays={role.expiryDays}
              roleTitle={role.roleTitle}
              companyName={role.companyName}
              skills={role.skills}
              salary={role.salary}
              iconType={role.iconType}
            />
          ))}
        </div>

      </div>
    </section>
  );
}