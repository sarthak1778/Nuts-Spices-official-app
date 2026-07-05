/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Automatically transition after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background with Subtle Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-75"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjkcFFRHzseWJUsYW-oGaYAFu1sR6FUtXIxTqTfMrYmLL4u4187ZjvxfFAY1Zw2Ba1K95ToA20aBp2GPFkei-C_UV9HGU1NStVtMv5Z3jYxrX3nm09seT5HZfmTWiXEeMbjN58l2eLQzZ9iWegFvT8jyyWQJS5THsJDdHKb2gKwguDh2M8v32d-wu6IcC9b-6ZwB0nzlRfOtiAI0HZe8kWpPlY4ilpBqhvNqS01GXhfMNek4M3AFWisnA2fqiMEmdwKj3oJGFerkZ1')`,
        }}
      />

      {/* Radiant Gradient Overlay for Contrast */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.85) 90%)"
        }}
      />

      {/* Main Branding Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Animated Brand Icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="bg-emerald-800/30 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 shadow-xl inline-block">
            <Sparkles className="text-emerald-400 w-10 h-10 animate-pulse" />
          </div>
        </motion.div>

        {/* Title & Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="space-y-3"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-amber-200 tracking-tight leading-none drop-shadow-md">
            Nuts <span className="text-emerald-400">&amp;</span> Spices
          </h1>
          <p className="font-sans text-lg text-amber-100/70 tracking-widest uppercase text-sm font-medium">
            Pure • Organic • Hand-Picked
          </p>
        </motion.div>

        {/* Dynamic Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 w-48 space-y-3 flex flex-col items-center"
        >
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 h-full w-1/3 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]"
            />
          </div>
          <span className="block text-xs uppercase tracking-[0.25em] text-emerald-300 font-semibold animate-pulse">
            Initializing App
          </span>
        </motion.div>

        {/* Skip button for prototype ease-of-use */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={onComplete}
          className="mt-8 px-5 py-2 text-xs uppercase tracking-widest text-white/80 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer z-30"
        >
          Skip Intro
        </motion.button>
      </div>

      {/* Footer Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-2 text-white/50 text-sm font-medium tracking-wide z-20"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        Certified Premium Quality
      </motion.div>
    </div>
  );
}
