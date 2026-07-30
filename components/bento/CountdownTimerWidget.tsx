"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw, CheckCircle2 } from "lucide-react"

export function CountdownTimerWidget() {
  const [seconds, setSeconds] = useState(10)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1
          if (minutes > 0) {
            setMinutes((m) => m - 1)
            return 59
          }
          if (hours > 0) {
            setHours((h) => h - 1)
            setMinutes(59)
            return 59
          }
          setIsRunning(false)
          setIsFinished(true)
          return 0
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, minutes, hours])

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setSeconds(10)
    }
    setIsFinished(false)
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsFinished(false)
    setHours(0)
    setMinutes(0)
    setSeconds(10)
  }

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="relative w-full max-w-sm rounded-3xl border border-sky-500/20 bg-sky-950/40 p-5 backdrop-blur-md select-none shadow-xl">
      {/* 3 Wheel Selector Columns */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* HOURS */}
        <div className="flex flex-col items-center rounded-2xl border border-sky-500/20 bg-sky-900/20 p-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase mb-2">
            HOURS
          </span>
          <div className="flex flex-col items-center gap-1 font-mono text-xs text-sky-400/40">
            <span>08</span>
            <span>09</span>
            <div className="my-1 rounded-xl bg-sky-500/20 border border-sky-400/40 px-3 py-1 text-base font-bold text-sky-100 shadow-md">
              {pad(hours)}
            </div>
            <span>01</span>
            <span>02</span>
          </div>
        </div>

        {/* MIN */}
        <div className="flex flex-col items-center rounded-2xl border border-sky-500/20 bg-sky-900/20 p-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase mb-2">
            MIN
          </span>
          <div className="flex flex-col items-center gap-1 font-mono text-xs text-sky-400/40">
            <span>08</span>
            <span>09</span>
            <div className="my-1 rounded-xl bg-sky-500/20 border border-sky-400/40 px-3 py-1 text-base font-bold text-sky-100 shadow-md">
              {pad(minutes)}
            </div>
            <span>01</span>
            <span>02</span>
          </div>
        </div>

        {/* SEC */}
        <div className="flex flex-col items-center rounded-2xl border border-sky-500/20 bg-sky-900/20 p-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase mb-2">
            SEC
          </span>
          <div className="flex flex-col items-center gap-1 font-mono text-xs text-sky-400/40">
            <span>08</span>
            <span>09</span>
            <motion.div
              key={seconds}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="my-1 rounded-xl bg-sky-500 border border-sky-300 px-3 py-1 text-base font-bold text-white shadow-lg shadow-sky-500/30"
            >
              {pad(seconds)}
            </motion.div>
            <span>11</span>
            <span>12</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`flex items-center gap-1.5 rounded-full px-5 py-1.5 text-xs font-semibold shadow-lg transition-all duration-200 active:scale-95 ${
            isRunning
              ? "bg-sky-500/50 text-white cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-400 shadow-sky-500/30"
          }`}
        >
          <Play className="h-3 w-3 fill-current" />
          <span>{isRunning ? "Running..." : "Start"}</span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-900/30 px-4 py-1.5 text-xs font-medium text-sky-200 hover:bg-sky-800/40 hover:text-white transition-all duration-200 active:scale-95"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono text-sky-300/80">
          {isFinished ? (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Capture Triggered!
            </span>
          ) : (
            `Timer Status: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
          )}
        </span>
      </div>
    </div>
  )
}
