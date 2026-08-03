"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const FluidBg = dynamic(() => import("../fluid/FluidBackground"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center bg-black select-none">
      {/* WebGL Atmospheric Shader Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FluidBg />
      </div>

      {/* Deep bottom fade to black */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* Hero Content — centered with top padding to clear fixed navbar */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-28 pb-12">
        {/* Glowing Center App Icon — glass pink like reference */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto mb-8 h-[72px] w-[72px]"
        >
          {/* Soft outer bloom behind the icon */}
          <div className="absolute inset-[-18px] rounded-[28px] bg-pink-500/35 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-[22px] bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-600 shadow-[0_12px_40px_rgba(236,72,153,0.55)] ring-1 ring-white/30">
            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-t from-transparent via-white/10 to-white/35" />
            <span className="relative text-[34px] font-extrabold leading-none text-white drop-shadow-md">
              <Image src="logo.svg" alt="App Icon" width={1000} height={1200} className="size-8" />
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-white leading-[1.02]"
        >
          Screenshots that{" "}
          <span className="italic font-serif font-normal text-white/90">
            speak
          </span>{" "}
          louder
          <br />
          than words
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 text-base sm:text-lg text-white/70 max-w-md mx-auto leading-relaxed font-normal"
        >
          Capture, annotate, and share pixel-perfect screenshots in one click.
          Built for teams who move fast.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 flex flex-row items-center justify-center gap-3"
        >
          <button className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition-all duration-150 hover:bg-white/90 active:scale-[0.97] shadow-xl">
            Download Free
          </button>
          <button className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-md transition-all duration-150 hover:bg-white/15 hover:border-white/25 active:scale-[0.97]">
            Explore
          </button>
        </motion.div>
      </div>
    </section>
  );
}
