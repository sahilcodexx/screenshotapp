"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Activity } from "lucide-react"

export function UptimeChartVisual() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  // 24 status bars for 24-hour uptime metrics
  const bars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 30) + 70, // 70% to 100% height
    ms: Math.floor(Math.random() * 4) + 6, // 6ms - 9ms
  }))

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden p-4 select-none">
      {/* Header Metric */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Operational
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">99.99%</span>
            <span className="text-xs text-zinc-500 font-mono">Uptime SLA</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono text-emerald-300">
            <Zap className="h-3 w-3 text-emerald-400" />
            &lt; 8.4ms avg latency
          </span>
        </div>
      </div>

      {/* 24-Hour Uptime Bar Chart Grid */}
      <div className="mt-2">
        <div className="flex items-end justify-between gap-1 h-12 pt-2">
          {bars.map((bar) => {
            const isHovered = hoveredBar === bar.id
            return (
              <motion.div
                key={bar.id}
                onMouseEnter={() => setHoveredBar(bar.id)}
                onMouseLeave={() => setHoveredBar(null)}
                className="relative flex-1 rounded-full bg-emerald-500/30 transition-all duration-200 cursor-pointer hover:bg-emerald-400"
                style={{ height: `${bar.height}%` }}
                whileHover={{ scaleY: 1.15 }}
              >
                <div className="h-full w-full rounded-full bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-80" />
                {isHovered && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-white shadow border border-zinc-700 whitespace-nowrap z-20">
                    {bar.ms}ms
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-1.5">
          <span>24h ago</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Activity className="h-2.5 w-2.5 text-emerald-400" /> 100% Verified
          </span>
          <span>Just now</span>
        </div>
      </div>
    </div>
  )
}
