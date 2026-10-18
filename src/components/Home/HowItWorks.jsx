"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Cpu, Handshake, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: ClipboardList,
    title: "Post Your Role",
    description:
      "Founders list open positions in minutes. Define the skills, equity, and vision you need.",
    accent: "#0DFFCA",
    accentRgb: "13,255,202",
  },
  {
    id: 2,
    icon: Cpu,
    title: "Get Matched",
    description:
      "Our platform surfaces the best-fit candidates. Browse profiles, review portfolios, and shortlist talent.",
    accent: "#6C8EFF",
    accentRgb: "108,142,255",
  },
  {
    id: 3,
    icon: Handshake,
    title: "Hire & Build",
    description:
      "Connect, negotiate, and onboard — all within StartupForge. Launch your dream team fast.",
    accent: "#FFD060",
    accentRgb: "255,208,96",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function HowItWorks() {
  return (
    <section
      className="w-full py-24 px-6 overflow-hidden"
      style={{ background: "var(--sf-navy-mid)" }}
    >
      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            How It Works
          </span>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight leading-[1.15]">
            From Listing to Launch in{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              3 Simple Steps
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            We've simplified the hiring process so founders can focus on building
            — not searching.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  variants={stepVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative rounded-2xl p-8 border overflow-hidden flex flex-col items-center text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${step.accent} 50%, transparent 100%)`,
                      opacity: 0.7,
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${step.accentRgb},0.1) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Step number badge */}
                  <div
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `rgba(${step.accentRgb},0.1)`,
                      color: step.accent,
                      border: `1px solid rgba(${step.accentRgb},0.25)`,
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `rgba(${step.accentRgb},0.1)`,
                      border: `1.5px solid rgba(${step.accentRgb},0.25)`,
                    }}
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  >
                    <IconComponent
                      size={28}
                      strokeWidth={2}
                      style={{ color: step.accent }}
                    />
                  </motion.div>

                  <h3 className="text-white font-bold text-xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-400 text-sm leading-[1.7] max-w-xs">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow connector between cards */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex absolute items-center justify-center pointer-events-none"
                    style={{
                      top: "50%",
                      left: `calc(${((i + 1) / 3) * 100}% - 12px)`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.4, ease: "backOut" }}
                  >
                    <ArrowRight size={20} style={{ color: "rgba(13,255,202,0.4)" }} />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
