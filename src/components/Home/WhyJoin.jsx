"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Award } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Speed",
    description:
      "From first contact to final onboarding in record time. Our matching algorithms prioritize momentum.",
    icon: Zap,
    accent: "#0DFFCA",
    glow: "rgba(13,255,202,0.15)",
  },
  {
    id: 2,
    title: "Trust",
    description:
      "Vetted founders and verified talent only. We build a high-trust ecosystem for serious builders.",
    icon: ShieldCheck,
    accent: "#6C8EFF",
    glow: "rgba(108,142,255,0.15)",
  },
  {
    id: 3,
    title: "Quality",
    description:
      "Access top-tier roles and elite founding teams that are shaping the future of global industries.",
    icon: Award,
    accent: "#FFD060",
    glow: "rgba(255,208,96,0.15)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

export default function WhyJoin() {
  return (
    <section
      className="w-full py-24 px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "var(--sf-navy)" }}
    >
      <div className="w-full max-w-6xl mx-auto text-center">

        {/* Header */}
        <motion.div
          className="mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-5"
            style={{
              background: "rgba(13,255,202,0.07)",
              borderColor: "rgba(13,255,202,0.2)",
              color: "#0DFFCA",
            }}
          >
            Why StartupForge
          </span>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight leading-[1.15]">
            Built for{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Serious Builders
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
            We provide the infrastructure for excellence, ensuring every connection
            leads to meaningful progress.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl border overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${feature.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Left accent line */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    background: `rgba(${feature.accent === "#0DFFCA" ? "13,255,202" : feature.accent === "#6C8EFF" ? "108,142,255" : "255,208,96"},0.1)`,
                    border: `1px solid ${feature.accent}30`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <IconComponent size={28} strokeWidth={2} style={{ color: feature.accent }} />
                </motion.div>

                <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-400 text-sm sm:text-[15px] leading-[1.7] max-w-xs">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}