"use client"

import { motion } from "motion/react"
import dynamic from "next/dynamic"

const FluidBg = dynamic(() => import("../fluid/FluidBackground"), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-black">
      <FluidBg />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-60% to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            <span className="bg-gradient-to-br from-white via-white to-zinc-300 bg-clip-text text-transparent">
              Screenshots
            </span>
            <br />
            <span className="bg-gradient-to-br from-pink-300 via-pink-400 to-pink-600 bg-clip-text text-transparent">
              done right.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 text-base sm:text-lg text-zinc-500 max-w-lg mx-auto leading-relaxed"
        >
          Capture, annotate, and share in seconds.
          <br />
          Built for teams who care about clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-black transition-all duration-150 hover:bg-white/90 active:scale-[0.97]">
            Get Started Free
          </button>
          <button className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-7 text-sm font-medium text-zinc-400 transition-all duration-150 hover:border-zinc-500 hover:text-white active:scale-[0.97]">
            Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  )
}
