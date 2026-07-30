"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Command, Sparkles, ArrowUp } from "lucide-react"

export function KeycapsVisual() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [lastTriggered, setLastTriggered] = useState("⌘ + ⇧ + 4 (Instant Screenshot)")

  const handleKeyPress = (key: string, label: string) => {
    setActiveKey(key)
    setLastTriggered(label)
    setTimeout(() => setActiveKey(null), 300)
  }

  const keys = [
    { id: "cmd", symbol: "⌘", label: "Command", desc: "⌘ + ⇧ + 4 (Instant Area)" },
    { id: "shift", symbol: "⇧", label: "Shift", desc: "⌘ + ⇧ + 3 (Full Screen)" },
    { id: "digit", symbol: "4", label: "Key 4", desc: "⌘ + ⇧ + 5 (Screen Record)" },
  ]

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden p-4 select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono text-zinc-400 font-medium flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-amber-400" />
          Hardware Keyboard Binds
        </span>
        <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Zero Mouse Friction
        </span>
      </div>

      {/* 3D Tactile Keycaps Row */}
      <div className="flex items-center justify-center gap-3 py-2">
        {keys.map((k) => {
          const isPressed = activeKey === k.id
          return (
            <motion.button
              key={k.id}
              onClick={() => handleKeyPress(k.id, k.desc)}
              animate={{
                y: isPressed ? 4 : 0,
                scale: isPressed ? 0.94 : 1,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`relative flex h-14 w-14 flex-col items-center justify-center rounded-xl border font-mono shadow-xl transition-colors duration-150 ${
                isPressed
                  ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow-amber-500/30"
                  : "border-zinc-700/80 bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-200 hover:border-zinc-600"
              }`}
            >
              <span className="text-lg font-bold">{k.symbol}</span>
              <span className="text-[9px] font-mono text-zinc-400 uppercase">{k.label}</span>
              {/* Bottom 3D bevel edge simulation */}
              <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-zinc-950/60" />
            </motion.button>
          )
        })}
      </div>

      {/* Keystroke Feedback Bar */}
      <div className="mt-3 text-center">
        <span className="inline-block rounded-md bg-zinc-950 px-3 py-1 font-mono text-[10px] text-zinc-400 border border-zinc-800">
          Shortcut Trigger: <span className="text-amber-300 font-semibold">{lastTriggered}</span>
        </span>
      </div>
    </div>
  )
}
