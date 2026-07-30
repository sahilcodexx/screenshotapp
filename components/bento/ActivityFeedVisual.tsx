"use client"

import React from "react"
import { motion } from "framer-motion"
import { Camera, Zap, Trophy, CheckCircle2 } from "lucide-react"

export function ActivityFeedVisual() {
  const feedItems = [
    {
      id: 1,
      title: "Capture finished",
      time: "1h ago",
      desc: "Full page 4K Retina PNG saved",
      icon: Camera,
      color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    },
    {
      id: 2,
      title: "Auto-tagged #design",
      time: "32m ago",
      desc: "Smart project classifier applied",
      icon: Zap,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    {
      id: 3,
      title: "Share link copied",
      time: "15m ago",
      desc: "Shared to Slack #dev-team",
      icon: Trophy,
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      id: 4,
      title: "Team approved",
      time: "8m ago",
      desc: "Annotation comment resolved",
      icon: CheckCircle2,
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
  ]

  return (
    <div className="relative w-full space-y-2.5 select-none">
      {feedItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-3 shadow-md backdrop-blur-md transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-900/30 cursor-pointer"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${item.color} shadow-inner`}>
              <Icon className="h-4 w-4" />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                <span className="text-[10px] font-mono text-emerald-400/70 shrink-0 ml-2">{item.time}</span>
              </div>
              <p className="text-[11px] text-emerald-200/60 truncate mt-0.5">{item.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
