"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Briefcase3D from "@/components/ui/Briefcase3D";

const LOADING_MESSAGES = [
  "Forging opportunities...",
  "Matching top talent with high-growth startups...",
  "Curating vetted tech & founder roles...",
  "Powering up the startup ecosystem...",
  "Preparing your career dashboard...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[85vh] w-full px-6 overflow-hidden select-none"
      style={{
        background: "transparent",
      }}
    >
      {/* ── Ambient Radial Mesh Glows (Identical to Landing Page) ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,255,202,0.12) 0%, rgba(108,142,255,0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,255,202,0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Center Content Container ── */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto text-center">

        {/* 3D Animated Briefcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <Briefcase3D size={210} />
        </motion.div>

        {/* Brand System Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
          style={{
            background: "rgba(13,255,202,0.08)",
            border: "1px solid rgba(13,255,202,0.22)",
            color: "#0DFFCA",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#0DFFCA" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#0DFFCA" }}
            />
          </span>
          Startup<span className="text-white">Forge</span>
        </motion.div>

        {/* Dynamic Rotating Message with Smooth Fade */}
        <div className="h-8 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-gray-300 text-sm sm:text-base font-medium tracking-wide"
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Glowing Sleek Progress Track */}
        <div
          className="w-56 h-1.5 rounded-full overflow-hidden relative"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <motion.div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              width: "45%",
              background:
                "linear-gradient(90deg, transparent, #0DFFCA, #6C8EFF, transparent)",
              boxShadow: "0 0 14px rgba(13,255,202,0.8)",
            }}
            animate={{
              left: ["-45%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Micro Subtext */}
        <p className="text-gray-500 text-xs mt-3 tracking-wider uppercase font-mono">
          Loading ecosystem data
        </p>
      </div>
    </div>
  );
}