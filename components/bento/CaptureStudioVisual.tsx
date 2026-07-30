"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Check, Sparkles, Maximize2, Crop } from "lucide-react"

export function CaptureStudioVisual() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [captured, setCaptured] = useState(false)

  const triggerCapture = () => {
    if (isCapturing) return
    setIsCapturing(true)
    setTimeout(() => {
      setIsCapturing(false)
      setCaptured(true)
      setTimeout(() => setCaptured(false), 2500)
    }, 400)
  }

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 overflow-hidden shadow-inner select-none">
      {/* Flash overlay effect */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-50 bg-white"
          />
        )}
      </AnimatePresence>

      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
          <Crop className="h-3 w-3 text-pink-400" />
          <span>Capture_Canvas.png</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
            ⌘ ⇧ 4
          </span>
        </div>
      </div>

      {/* Screen Canvas Area */}
      <div className="relative p-4 md:p-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 min-h-[220px] flex items-center justify-center overflow-hidden">
        {/* Abstract App Graphic mockup */}
        <div className="w-full max-w-sm rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              </div>
              <div className="h-2.5 w-24 rounded-full bg-zinc-700/60" />
            </div>
            <div className="h-2 w-12 rounded-full bg-zinc-800" />
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-zinc-800/90" />
            <div className="h-2 w-4/5 rounded-full bg-zinc-800/60" />
            <div className="h-2 w-3/5 rounded-full bg-zinc-800/40" />
          </div>

          {/* Marquee Crop Selection Box */}
          <motion.div
            animate={{
              borderColor: ["rgba(236,72,153,0.4)", "rgba(236,72,153,0.9)", "rgba(236,72,153,0.4)"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative mt-4 rounded-lg border-2 border-dashed border-pink-500/80 bg-pink-500/10 p-3"
          >
            <div className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-pink-500 border-2 border-zinc-950 shadow-md flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 h-5 w-5 rounded-full bg-pink-500 border-2 border-zinc-950 shadow-md flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-pink-300 font-medium">
              <span>Active Marquee Region</span>
              <span className="bg-pink-500/20 px-1.5 py-0.5 rounded text-[10px]">1920 × 1080</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Capture Trigger Bar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3 py-1.5 shadow-2xl backdrop-blur-xl">
          <button
            onClick={triggerCapture}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-pink-500/25 transition-all duration-200 hover:scale-105 active:scale-[0.95]"
          >
            {captured ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Captured!</span>
              </>
            ) : (
              <>
                <Camera className="h-3.5 w-3.5" />
                <span>Click to Capture</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
