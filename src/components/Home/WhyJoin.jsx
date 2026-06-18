"use client";

import React from "react";
import { Zap, ShieldCheck, Award } from "lucide-react";

export default function WhyJoin() {
  const features = [
    {
      id: 1,
      title: "Speed",
      description:
        "From first contact to final onboarding in record time. Our matching algorithms prioritize momentum.",
      icon: Zap,
    },
    {
      id: 2,
      title: "Trust",
      description:
        "Vetted founders and verified talent only. We build a high-trust ecosystem for serious builders.",
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: "Quality",
      description:
        "Access top-tier roles and elite founding teams that are shaping the future of global industries.",
      icon: Award,
    },
  ];

  return (
    // Dark background matching your mockup palette (#030f26 / deep dark navy blue)
    <section className="w-full bg-[#051124] text-white py-20 px-6 flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-[42px] tracking-tight transition-all">
            Why Join StartupForge?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-normal opacity-90">
            We provide the infrastructure for excellence, ensuring every connection leads 
            to meaningful progress.
          </p>
        </div>

        {/* Features Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 px-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="flex flex-col items-center justify-center text-center group"
              >
                {/* Circular Teal Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#0c6c60] flex items-center justify-center text-white mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <IconComponent size={24} strokeWidth={2.5} />
                </div>

                {/* Feature Title */}
                <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="mt-3 text-gray-400 text-sm sm:text-[15px] leading-[1.6] max-w-xs md:max-w-none">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}