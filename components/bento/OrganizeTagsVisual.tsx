"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Tag, Folder, Hash } from "lucide-react"

export function OrganizeTagsVisual() {
  const [selectedTag, setSelectedTag] = useState<string | null>("design")

  const tags = [
    { id: "design", label: "design-system", color: "border-pink-500/40 bg-pink-500/10 text-pink-300" },
    { id: "bug", label: "bug-report", color: "border-rose-500/40 bg-rose-500/10 text-rose-300" },
    { id: "v2", label: "v2-launch", color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
    { id: "ui", label: "marketing-ui", color: "border-purple-500/40 bg-purple-500/10 text-purple-300" },
  ]

  const items = [
    { name: "HeroSection_V2.png", tag: "design", size: "2.4 MB", date: "2m ago" },
    { name: "AuthModal_Bug.png", tag: "bug", size: "1.1 MB", date: "15m ago" },
    { name: "Dashboard_Preview.png", tag: "v2", size: "3.8 MB", date: "1h ago" },
  ]

  const filteredItems = selectedTag
    ? items.filter((item) => item.tag === selectedTag)
    : items

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden p-4 select-none">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/90 px-3 py-2 text-xs text-zinc-400 mb-3">
        <Search className="h-3.5 w-3.5 text-cyan-400" />
        <span className="flex-1 font-mono text-[11px]">Auto-tagged by AI project classifier...</span>
        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">⌘K</span>
      </div>

      {/* Interactive Tag Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {tags.map((t) => {
          const isSelected = selectedTag === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTag(isSelected ? null : t.id)}
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-mono transition-all duration-200 active:scale-95 ${
                isSelected ? `${t.color} font-medium shadow-sm` : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <Hash className="h-3 w-3 opacity-70" />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      {/* Filtered File Rows */}
      <div className="space-y-1.5">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-950/60 px-3 py-1.5 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <Folder className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-mono text-zinc-300 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px]">
                <span>{item.size}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
