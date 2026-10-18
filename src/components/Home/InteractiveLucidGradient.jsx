"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

export default function InteractiveLucidGradient() {
  const containerRef = useRef(null);

  // Motion values for raw mouse coordinates
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(350);

  // Primary fast spring for direct interactive cursor glow
  const springX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 0.5 });

  // Secondary lagging spring for iridescent trailing color shift
  const lagSpringX = useSpring(mouseX, { stiffness: 65, damping: 28, mass: 1 });
  const lagSpringY = useSpring(mouseY, { stiffness: 65, damping: 28, mass: 1 });

  // Interactive tilt angle for conic aurora beams
  const beamRotate = useTransform(springX, [0, 1400], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // Dynamic radial gradients tracking the interactive cursor in real time
  const primaryCursorGlow = useMotionTemplate`radial-gradient(550px circle at ${springX}px ${springY}px, rgba(13, 255, 202, 0.32) 0%, rgba(0, 240, 255, 0.18) 35%, rgba(108, 142, 255, 0.08) 60%, transparent 80%)`;
  const trailingCursorGlow = useMotionTemplate`radial-gradient(480px circle at ${lagSpringX}px ${lagSpringY}px, rgba(168, 85, 247, 0.28) 0%, rgba(108, 142, 255, 0.2) 40%, transparent 75%)`;
  const gridMask = useMotionTemplate`radial-gradient(650px circle at ${springX}px ${springY}px, black 15%, transparent 85%)`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto z-0 select-none"
      style={{ background: "#030C1B" }}
    >
      {/* ── 1. AMBIENT FLUID MULTI-BLOB GRADIENT MESH (Continuous Drift) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        {/* Blob A: Teal/Cyan (Top-Left) */}
        <motion.div
          className="absolute -top-[10%] -left-[5%] w-[650px] h-[650px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(13,255,202,0.3) 0%, rgba(0,240,255,0.15) 45%, transparent 70%)",
            filter: "blur(75px)",
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob B: Electric Indigo (Top-Right) */}
        <motion.div
          className="absolute -top-[15%] -right-[8%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(108,142,255,0.32) 0%, rgba(168,85,247,0.18) 50%, transparent 70%)",
            filter: "blur(85px)",
          }}
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -50, 0],
            scale: [1, 1.18, 0.92, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob C: Neon Violet (Center-Bottom) */}
        <motion.div
          className="absolute -bottom-[20%] left-[25%] w-[680px] h-[680px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.25) 0%, rgba(108,142,255,0.15) 45%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -60, 30, 0],
            scale: [0.95, 1.2, 1, 0.95],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob D: Deep Sea Azure (Bottom-Right) */}
        <motion.div
          className="absolute bottom-[-10%] right-[10%] w-[580px] h-[580px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,100,220,0.22) 0%, rgba(13,255,202,0.12) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 40, -40, 0],
            scale: [1.1, 0.9, 1.15, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ── 2. INTERACTIVE MOUSE-FOLLOWING LUCID GRADIENT BLOBS ── */}
      {/* Trailing Iridescent Violet Glow (Lagging Spring) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: trailingCursorGlow,
          mixBlendMode: "screen",
          filter: "blur(30px)",
        }}
      />

      {/* Primary Cyan/Teal Interactive Spotlight (Fast Spring) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: primaryCursorGlow,
          mixBlendMode: "screen",
          filter: "blur(20px)",
        }}
      />

      {/* ── 3. INTERACTIVE CONIC AURORA BEAMS (Tilts with cursor) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none overflow-hidden">
        {/* Dynamic Tilting Beam */}
        <motion.div
          className="absolute -top-[140px] left-1/2 -translate-x-1/2 w-[900px] h-[650px] opacity-40 blur-[90px] rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 40%, #0DFFCA 0deg, #6C8EFF 70deg, #A855F7 130deg, transparent 200deg, #6C8EFF 310deg, #0DFFCA 360deg)",
            rotate: beamRotate,
          }}
        />

        {/* Luminous Horizontal Laser Line */}
        <div
          className="absolute top-[260px] left-1/2 -translate-x-1/2 w-[850px] h-[1.5px] opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(13,255,202,0.8) 30%, rgba(108,142,255,0.9) 50%, rgba(13,255,202,0.8) 70%, transparent)",
            boxShadow:
              "0 0 25px rgba(13,255,202,0.9), 0 0 50px rgba(108,142,255,0.6)",
          }}
        />
      </div>

      {/* ── 4. INTERACTIVE CRYSTAL GRID SPOTLIGHT ── */}
      {/* Base Grid Layer (Subtle) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Interactive Illuminated Grid (Reveals wherever cursor travels!) */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 255, 202, 0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 255, 202, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* ── 5. LUCID GLASS RINGS (With subtle depth) ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[740px] rounded-full border border-white/[0.04] animate-slow-spin pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 80px rgba(13,255,202,0.03), 0 0 80px rgba(108,142,255,0.03)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#0DFFCA]/[0.08] pointer-events-none"
        style={{ animation: "slow-spin 22s linear infinite reverse" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-dashed border-[#6C8EFF]/[0.12] pointer-events-none" />
    </div>
  );
}
