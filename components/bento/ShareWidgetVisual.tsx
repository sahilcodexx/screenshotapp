"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link2, Check, Share2, MessageSquare, GitBranch, Layers, LayoutGrid, FileText } from "lucide-react"

export function ShareWidgetVisual() {
  const [copied, setCopied] = useState(false)

  const integrations = [
    { name: "Slack", icon: MessageSquare, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "GitHub", icon: GitBranch, color: "text-zinc-300 bg-zinc-800 border-zinc-700" },
    { name: "Linear", icon: Layers, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { name: "Figma", icon: LayoutGrid, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { name: "Notion", icon: FileText, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ]

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden p-4 select-none">
      {/* Integration Badges Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono text-zinc-400 font-medium flex items-center gap-1.5">
          <Share2 className="h-3 w-3 text-orange-400" />
          Instant Integrations
        </span>
        <div className="flex items-center gap-1.5">
          {integrations.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15, y: -2 }}
                className={`flex h-6 w-6 items-center justify-center rounded-lg border ${item.color} shadow-sm transition-all duration-200`}
                title={item.name}
              >
                <Icon className="h-3 w-3" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Copy Link Interactive Pill Bar */}
      <div className="relative rounded-xl border border-zinc-800 bg-zinc-950/80 p-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Link2 className="h-3.5 w-3.5" />
          </div>
          <div className="truncate font-mono text-[11px] text-zinc-400">
            https://snap.app/s/89f2-k9a1
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`relative shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.96] ${
            copied
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
              : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700/60"
          }`}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1"
              >
                <Check className="h-3.5 w-3.5 text-white" />
                <span>Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1"
              >
                <span>Copy Link</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}
