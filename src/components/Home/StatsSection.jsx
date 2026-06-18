"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
// Switched to Lucide icons
import { Rocket, Users, HandCoins } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "500+",
      label: "STARTUPS BUILT",
      icon: Rocket,
    },
    {
      id: 2,
      value: "12k+",
      label: "TALENT PLACED",
      icon: Users,
    },
    {
      id: 3,
      value: "$2.4B",
      label: "FUNDING RAISED",
      icon: HandCoins, // Clean icon representing funding/capital handover
    },
  ];

  return (
    <section className="w-full bg-[#f0f5ff] py-12 sm:py-16 px-6 flex justify-center items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className="group flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Responsive Icon container */}
              <div className="mb-3 text-[#0a6c61]/80 group-hover:text-[#0a6c61] transition-colors duration-300">
                <IconComponent size={28} strokeWidth={2} />
              </div>

              {/* Statistic Big Number */}
              <span className="text-[#0a6c61] font-bold text-4xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                {stat.value}
              </span>

              {/* Statistic Label */}
              <span className="mt-2 text-[#4a5568] font-bold text-xs md:text-sm tracking-widest uppercase opacity-90">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}