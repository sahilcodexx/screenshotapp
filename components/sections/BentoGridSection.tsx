"use client"

import React from "react"
import { motion } from "framer-motion"
import { BentoCard } from "@/components/ui/bento-card"
import { ConsistencyParticleVisual } from "@/components/bento/ConsistencyParticleVisual"
import { CountdownTimerWidget } from "@/components/bento/CountdownTimerWidget"
import { HeatmapVisual } from "@/components/bento/HeatmapVisual"
import { ActivityFeedVisual } from "@/components/bento/ActivityFeedVisual"
import dynamic from "next/dynamic"

const GlobalGlobeVisual = dynamic(
  () => import("@/components/bento/GlobalGlobeVisual").then((m) => m.GlobalGlobeVisual),
  { ssr: false }
)

export default function BentoGridSection() {
  return (
    <section className="relative py-24 md:py-36 bg-black overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[700px] h-[500px] bg-sky-600/10 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-purple-300 shadow-sm">
            ★ Modern Bento Suite
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Designed for performance.
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-sky-400 to-amber-300 bg-clip-text text-transparent">
              Engineered for perfection.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Beautiful tinted cards, real-time interactive UI widgets, 3D point-cloud visuals, and live telemetry feeds.
          </p>
        </motion.div>

        {/* Master Bento Grid - 12 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 14 Days Consistency (4 Columns on Desktop) */}
          <BentoCard
            className="md:col-span-12 lg:col-span-4 rounded-[32px] bg-gradient-to-b from-purple-500/15 via-purple-950/40 to-zinc-950 border-purple-500/20 hover:border-purple-400/40 flex flex-col justify-between p-8"
            glowColor="rgba(168, 85, 247, 0.25)"
          >
            <ConsistencyParticleVisual />

            <div className="mt-6">
              <span className="text-3xl font-extrabold text-white tracking-tight block">
                14 days
              </span>
              <h3 className="text-2xl font-bold text-purple-200 tracking-tight mt-0.5">
                consistency
              </h3>
              <p className="mt-3 text-sm text-purple-200/70 leading-relaxed">
                Build daily momentum and see your focus & screenshot streak grow with every completed session.
              </p>
            </div>
          </BentoCard>

          {/* Card 2: Timer Clock / Build your own countdown (8 Columns on Desktop) */}
          <BentoCard
            className="md:col-span-12 lg:col-span-8 rounded-[32px] bg-gradient-to-b from-sky-500/15 via-sky-950/40 to-zinc-950 border-sky-500/20 hover:border-sky-400/40 flex flex-col md:flex-row items-center justify-between gap-8 p-8"
            glowColor="rgba(56, 189, 248, 0.25)"
          >
            <div className="md:w-1/2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-400">
                TIMED SHUTTER
              </span>
              <h3 className="text-3xl font-bold text-white tracking-tight mt-2">
                Timer Clock
              </h3>
              <h4 className="text-2xl font-semibold text-sky-200/90 tracking-tight mt-1">
                Build your own countdown.
              </h4>
              <p className="mt-3 text-sm text-sky-200/70 leading-relaxed">
                Choose hours, minutes, and seconds, then start the shutter timer for hands-free region captures.
              </p>
            </div>

            <div className="md:w-1/2 w-full flex justify-center">
              <CountdownTimerWidget />
            </div>
          </BentoCard>

          {/* Card 3: Heatmap of your consistency (4 Columns on Desktop) */}
          <BentoCard
            className="md:col-span-12 lg:col-span-4 rounded-[32px] bg-gradient-to-b from-amber-500/15 via-amber-950/40 to-zinc-950 border-amber-500/20 hover:border-amber-400/40 flex flex-col justify-between p-8"
            glowColor="rgba(245, 158, 11, 0.25)"
          >
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Heatmap of your
              </h3>
              <h4 className="text-2xl font-bold text-amber-300 tracking-tight">
                consistency
              </h4>
              <p className="mt-2.5 text-sm text-amber-200/70 leading-relaxed mb-6">
                Visualize your dedication over the entire year with a GitHub-style activity contribution map.
              </p>
            </div>

            <HeatmapVisual />
          </BentoCard>

          {/* Card 4: Real-time activity feed (4 Columns on Desktop) */}
          <BentoCard
            className="md:col-span-12 lg:col-span-4 rounded-[32px] bg-gradient-to-b from-emerald-500/15 via-emerald-950/40 to-zinc-950 border-emerald-500/20 hover:border-emerald-400/40 flex flex-col justify-between p-8"
            glowColor="rgba(16, 185, 129, 0.25)"
          >
            <div>
              <h3 className="text-2xl font-bold text-emerald-300 tracking-tight">
                Real-time activity feed
              </h3>
              <p className="mt-2.5 text-sm text-emerald-200/70 leading-relaxed mb-5">
                Get instant feedback on session completions, streak milestones, and team progress.
              </p>
            </div>

            <ActivityFeedVisual />
          </BentoCard>

          {/* Card 5: Global focus community (4 Columns on Desktop) */}
          <BentoCard
            className="md:col-span-12 lg:col-span-4 rounded-[32px] bg-gradient-to-b from-violet-500/15 via-violet-950/40 to-zinc-950 border-violet-500/20 hover:border-violet-400/40 flex flex-col justify-between p-8"
            glowColor="rgba(139, 92, 246, 0.25)"
          >
            <div>
              <h3 className="text-2xl font-bold text-violet-300 tracking-tight">
                Global focus community
              </h3>
              <p className="mt-2.5 text-sm text-violet-200/70 leading-relaxed mb-2">
                Join students and developers worldwide tracking focus sessions & visual feedback in real time.
              </p>
            </div>

            <GlobalGlobeVisual />
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
