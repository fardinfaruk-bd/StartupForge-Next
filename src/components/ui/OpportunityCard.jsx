"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Clock, ArrowUpRight, Wifi, MapPin } from "lucide-react";

const WORK_TYPE_STYLE = {
  remote: { bg: "rgba(108,142,255,0.12)", border: "rgba(108,142,255,0.25)", color: "#6C8EFF", label: "Remote" },
  onsite: { bg: "rgba(13,255,202,0.1)",   border: "rgba(13,255,202,0.25)",  color: "#0DFFCA", label: "On-site" },
  hybrid: { bg: "rgba(255,208,96,0.1)",   border: "rgba(255,208,96,0.25)",  color: "#FFD060", label: "Hybrid"  },
};

export default function OpportunityCard({ opportunity }) {
  const style =
    WORK_TYPE_STYLE[opportunity?.workType] || WORK_TYPE_STYLE.onsite;

  const today = new Date();
  const expireDate = new Date(opportunity?.deadline);
  const diffDays = Math.max(0, Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)));

  const urgency =
    diffDays <= 3
      ? { color: "#FF7A5C", label: `${diffDays}d left` }
      : diffDays <= 7
      ? { color: "#FFD060", label: `${diffDays}d left` }
      : { color: "#9ca3af", label: `${diffDays}d left` };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group relative w-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden border"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        minHeight: "260px",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${style.bg.replace("0.1", "0.06")} 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${style.color}, transparent)`,
        }}
      />

      <div>
        {/* Header row: work-type badge + deadline */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide"
            style={{
              background: style.bg,
              border: `1px solid ${style.border}`,
              color: style.color,
            }}
          >
            {opportunity?.workType === "remote" ? (
              <Wifi size={10} strokeWidth={2.5} />
            ) : (
              <MapPin size={10} strokeWidth={2.5} />
            )}
            {style.label}
          </span>

          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: urgency.color }} />
            <span className="text-xs font-semibold" style={{ color: urgency.color }}>
              {urgency.label}
            </span>
          </div>
        </div>

        {/* Role title */}
        <h3 className="text-white font-bold text-xl tracking-tight leading-snug">
          {opportunity?.roleTitle}
        </h3>

        {/* Skills row */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-1 leading-relaxed">
          {opportunity?.requiredSkills}
        </p>

        {/* Salary */}
        <div
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-xl text-sm font-semibold"
          style={{
            background: "rgba(13,255,202,0.06)",
            border: "1px solid rgba(13,255,202,0.15)",
            color: "#0DFFCA",
          }}
        >
          <DollarSign size={13} strokeWidth={2.5} />
          {opportunity?.minSalary} – {opportunity?.maxSalary}
        </div>
      </div>

      {/* CTA row */}
      <div className="flex items-center gap-3 mt-6">
        <Link href={`/opportunities/${opportunity?._id}`} className="flex-1">
          <Button
            className="w-full font-semibold text-[14px] h-[44px] rounded-xl transition-all"
            style={{
              background: "#0DFFCA",
              color: "#030C1B",
              boxShadow: "0 0 18px 0px rgba(13,255,202,0.25)",
            }}
          >
            Apply Now
          </Button>
        </Link>

        <Link href={`/opportunities/${opportunity?._id}`}>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all border opacity-60 group-hover:opacity-100"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <ArrowUpRight size={16} style={{ color: "#9ca3af" }} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}