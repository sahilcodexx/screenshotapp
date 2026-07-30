"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, EyeOff, Highlighter, MessageSquare, Sparkles } from "lucide-react"

export function AnnotationsVisual() {
  const [activeTool, setActiveTool] = useState<"arrow" | "blur" | "highlight" | "text">("arrow")

  const tools = [
    { id: "arrow", name: "Arrow", icon: ArrowUpRight, color: "text-purple-400" },
    { id: "blur", name: "Blur Mask", icon: EyeOff, color: "text-indigo-400" },
    { id: "highlight", name: "Highlight", icon: Highlighter, color: "text-amber-400" },
    { id: "text", name: "Comment", icon: MessageSquare, color: "text-cyan-400" },
  ] as const

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden shadow-inner select-none">
      {/* Tool Selector Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 bg-zinc-950/80">
        <span className="text-[11px] font-mono text-zinc-400 font-medium flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-purple-400" />
          Smart Annotation Tools
        </span>
        <div className="flex items-center gap-1 rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
          {tools.map((t) => {
            const Icon = t.icon
            const isSelected = activeTool === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`relative flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all duration-150 ${
                  isSelected ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                }`}
                title={t.name}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? t.color : ""}`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Mock Canvas */}
      <div className="relative p-4 bg-zinc-950 min-h-[170px] flex items-center justify-center overflow-hidden">
        {/* Sample Card Graphic */}
        <div className="relative w-full max-w-xs rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 w-28 rounded-full bg-zinc-700/80" />
            <div className="h-3 w-10 rounded-full bg-zinc-800" />
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-800/70 mb-1.5" />
          <div className="h-2 w-4/5 rounded-full bg-zinc-800/50 mb-3" />

          {/* Dynamic Annotation Overlay based on activeTool */}
          <AnimatePresence mode="wait">
            {activeTool === "arrow" && (
              <motion.div
                key="arrow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-purple-500/50 bg-purple-500/20 px-3 py-1 text-[11px] font-medium text-purple-300 shadow-lg shadow-purple-500/20"
              >
                <ArrowUpRight className="h-4 w-4 text-purple-400 animate-pulse" />
                <span>Refactor component layout</span>
              </motion.div>
            )}

            {activeTool === "blur" && (
              <motion.div
                key="blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-3 bottom-3 rounded-lg border border-indigo-500/40 bg-zinc-950/80 backdrop-blur-md p-2 text-center text-[10px] font-mono text-indigo-300"
              >
                🔒 [SENSITIVE API KEY BLURRED]
              </motion.div>
            )}

            {activeTool === "highlight" && (
              <motion.div
                key="highlight"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-4 left-4 rounded bg-amber-500/30 border border-amber-500/50 px-2 py-0.5 text-[11px] font-medium text-amber-200"
              >
                ⚡ Ultra high speed rendering
              </motion.div>
            )}

            {activeTool === "text" && (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-2 left-4 flex items-center gap-1.5 rounded-lg border border-cyan-500/50 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-cyan-300 shadow-xl"
              >
                <MessageSquare className="h-3 w-3 text-cyan-400" />
                <span>Approved by @alex</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
