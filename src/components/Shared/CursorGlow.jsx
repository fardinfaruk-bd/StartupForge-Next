"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // 1. Ultra-fast spring for center laser dot (zero-latency feel)
  const dotSpringConfig = { stiffness: 900, damping: 45, mass: 0.2 };
  const dotX = useSpring(rawX, dotSpringConfig);
  const dotY = useSpring(rawY, dotSpringConfig);

  // 2. Liquid spring for the outer rotating ring
  const ringSpringConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const ringX = useSpring(rawX, ringSpringConfig);
  const ringY = useSpring(rawY, ringSpringConfig);

  // 3. Trailing comet springs (3 graduated particles)
  const trail1X = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.7 });
  const trail1Y = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.7 });

  const trail2X = useSpring(rawX, { stiffness: 110, damping: 26, mass: 0.9 });
  const trail2Y = useSpring(rawY, { stiffness: 110, damping: 26, mass: 0.9 });

  const trail3X = useSpring(rawX, { stiffness: 75, damping: 28, mass: 1.1 });
  const trail3Y = useSpring(rawY, { stiffness: 75, damping: 28, mass: 1.1 });

  // 4. Large ambient luminous aura
  const auraSpring = { stiffness: 80, damping: 28, mass: 1.2 };
  const auraX = useSpring(rawX, auraSpring);
  const auraY = useSpring(rawY, auraSpring);

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Dynamic hover detection for interactive UI elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY, isVisible]);

  // If cursor is off-screen or not initialized, hide seamlessly
  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* ── 1. AMBIENT RADIAL LUMINOUS AURA ── */}
      <motion.div
        aria-hidden="true"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        animate={{
          width: isHovered ? 400 : 300,
          height: isHovered ? 400 : 300,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isHovered
              ? "radial-gradient(circle, rgba(13,255,202,0.18) 0%, rgba(108,142,255,0.08) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(13,255,202,0.12) 0%, rgba(13,255,202,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* ── 2. TRAILING COMET PARTICLES (Graduated Fluid Stream) ── */}
      {/* Comet particle 3 (Furthest, faintest) */}
      <motion.div
        aria-hidden="true"
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "#6C8EFF",
            opacity: 0.35,
            boxShadow: "0 0 6px #6C8EFF",
          }}
        />
      </motion.div>

      {/* Comet particle 2 (Mid-distance) */}
      <motion.div
        aria-hidden="true"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "#00F0FF",
            opacity: 0.5,
            boxShadow: "0 0 8px #00F0FF",
          }}
        />
      </motion.div>

      {/* Comet particle 1 (Closest to cursor) */}
      <motion.div
        aria-hidden="true"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "#0DFFCA",
            opacity: 0.65,
            boxShadow: "0 0 10px #0DFFCA",
          }}
        />
      </motion.div>

      {/* ── 3. ROTATING TECH RETICLE & EXPANDING HOVER RING ── */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        animate={{
          width: isClicking ? 28 : isHovered ? 56 : 38,
          height: isClicking ? 28 : isHovered ? 56 : 38,
          rotate: 360,
        }}
        transition={{
          width: { duration: 0.2, ease: "easeOut" },
          height: { duration: 0.2, ease: "easeOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        {/* Outer Circular Ring with Conic Gradient Trim */}
        <div
          className="w-full h-full rounded-full relative transition-all duration-300"
          style={{
            border: isHovered
              ? "1.8px solid #0DFFCA"
              : "1.5px solid rgba(13, 255, 202, 0.4)",
            boxShadow: isHovered
              ? "0 0 18px rgba(13, 255, 202, 0.6), inset 0 0 10px rgba(13, 255, 202, 0.2)"
              : "0 0 10px rgba(13, 255, 202, 0.25)",
            backdropFilter: isHovered ? "blur(2px)" : "none",
          }}
        >
          {/* Top Reticle Notch */}
          <span
            className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-[3px] rounded-full"
            style={{ background: "#0DFFCA" }}
          />
          {/* Bottom Reticle Notch */}
          <span
            className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-[3px] rounded-full"
            style={{ background: "#0DFFCA" }}
          />
          {/* Left Reticle Notch */}
          <span
            className="absolute top-1/2 -left-[3px] -translate-y-1/2 w-[3px] h-1.5 rounded-full"
            style={{ background: "#0DFFCA" }}
          />
          {/* Right Reticle Notch */}
          <span
            className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-[3px] h-1.5 rounded-full"
            style={{ background: "#0DFFCA" }}
          />
        </div>
      </motion.div>

      {/* ── 4. CLICK SHOCKWAVE RIPPLE (Fires dynamically on mousedown) ── */}
      {isClicking && (
        <motion.div
          aria-hidden="true"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed top-0 left-0 rounded-full border pointer-events-none"
          initial={{ width: 14, height: 14, opacity: 1, borderColor: "#0DFFCA" }}
          animate={{
            width: 70,
            height: 70,
            opacity: 0,
            borderColor: "#6C8EFF",
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}

      {/* ── 5. INNER ACCURACY LASER DOT (Zero-latency focal point) ── */}
      <motion.div
        aria-hidden="true"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Core Dot with Luminous Glow */}
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovered ? 8 : 7,
            height: isHovered ? 8 : 7,
            backgroundColor: isHovered ? "#FFFFFF" : "#0DFFCA",
            boxShadow: isHovered
              ? "0 0 14px 4px #0DFFCA, 0 0 24px 6px rgba(13,255,202,0.8)"
              : "0 0 10px 2.5px rgba(13,255,202,0.85), 0 0 20px rgba(13,255,202,0.4)",
          }}
        />
      </motion.div>
    </div>
  );
}
