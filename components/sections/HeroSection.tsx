"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import FluidBackground from "../fluid/FluidBackground"
import dynamic from "next/dynamic"

const FluidBg = dynamic(() => import("../fluid/FluidBackground"), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FluidBg />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-pink-300/80 border border-pink-500/20 rounded-full bg-pink-500/5">
            Coming Soon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent">
            ScreenshotPro
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Capture, annotate, and share stunning screenshots in seconds.
          Built for teams who care about clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative inline-flex h-12 items-center justify-center rounded-full bg-pink-500 px-8 text-sm font-medium text-white transition-all duration-200 hover:bg-pink-400 active:scale-[0.97]">
            Get Started Free
          </button>
          <button className="group relative inline-flex h-12 items-center justify-center rounded-full border border-zinc-700 px-8 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white active:scale-[0.97]">
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-xs text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60" />
            Instant Capture
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60" />
            Smart Annotations
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60" />
            Seamless Sharing
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-zinc-500"
        >
          <path
            d="M10 3v14M10 17l-5-5M10 17l5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
