"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, Tag } from "lucide-react";

export default function StartupCard({ startup }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group relative w-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden border"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(13,255,202,0.1)",
        backdropFilter: "blur(16px)",
        minHeight: "240px",
      }}
    >
      {/* Top glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,255,202,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top accent border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0DFFCA, transparent)",
        }}
      />

      <div>
        {/* Logo + Arrow row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={startup.logo}
              alt={`${startup.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Arrow icon — appears on hover */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
            style={{
              background: "rgba(13,255,202,0.12)",
              border: "1px solid rgba(13,255,202,0.25)",
            }}
          >
            <ArrowUpRight size={14} style={{ color: "#0DFFCA" }} />
          </div>
        </div>

        {/* Company name */}
        <h3 className="text-white font-bold text-xl tracking-tight leading-snug">
          {startup.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
          {startup.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              background: "rgba(13,255,202,0.08)",
              border: "1px solid rgba(13,255,202,0.18)",
              color: "#0DFFCA",
            }}
          >
            <Tag size={10} strokeWidth={2.5} />
            {startup.industry.charAt(0).toUpperCase() + startup.industry.slice(1)}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
          >
            <Users size={10} strokeWidth={2.5} />
            {startup.employeeCount} Members
          </span>
        </div>
      </div>

      {/* CTA */}
      <Link href={`/startups/${startup._id}`} className="mt-6 block">
        <Button
          variant="bordered"
          className="w-full font-semibold text-[14px] h-[42px] rounded-xl transition-all duration-300"
          style={{
            borderColor: "rgba(13,255,202,0.3)",
            color: "#0DFFCA",
            background: "rgba(13,255,202,0.05)",
          }}
        >
          View Profile
        </Button>
      </Link>
    </motion.div>
  );
}