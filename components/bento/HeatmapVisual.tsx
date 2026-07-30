"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function HeatmapVisual() {
  const [hoveredCell, setHoveredCell] = useState<{ day: string; count: number; date: string } | null>(null)

  // 14 columns x 5 rows grid
  const days = ["M", "T", "W", "T", "F"]
  const cols = 14

  const generateGrid = () => {
    const grid: number[][] = []
    for (let r = 0; r < 5; r++) {
      const row: number[] = []
      for (let c = 0; c < cols; c++) {
        const val = Math.floor(Math.random() * 5)
        row.push(val)
      }
      grid.push(row)
    }
    return grid
  }

  const [gridData, setGridData] = useState<number[][]>(() =>
    Array.from({ length: 5 }, () => Array(cols).fill(0))
  )

  useEffect(() => {
    setGridData(generateGrid())
  }, [])

  const getColorClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-amber-950/40 border-amber-900/30"
      case 1:
        return "bg-amber-800/40 border-amber-700/40"
      case 2:
        return "bg-amber-600/70 border-amber-500/60"
      case 3:
        return "bg-amber-500 border-amber-400"
      case 4:
        return "bg-amber-300 border-white shadow-sm shadow-amber-400/50"
      default:
        return "bg-amber-950/40"
    }
  }

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-amber-950/30 p-4 select-none">
      {/* Grid Container */}
      <div className="flex items-center gap-3 overflow-x-auto py-2">
        {/* Day Labels */}
        <div className="flex flex-col justify-between h-24 text-[10px] font-mono font-medium text-amber-400/80">
          <span>M</span>
          <span>W</span>
          <span>F</span>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-rows-5 grid-flow-col gap-1.5 flex-1">
          {gridData.map((row, rIdx) =>
            row.map((level, cIdx) => (
              <motion.div
                key={`${rIdx}-${cIdx}`}
                whileHover={{ scale: 1.3, zIndex: 10 }}
                onMouseEnter={() =>
                  setHoveredCell({
                    day: days[rIdx],
                    count: level * 4 + 1,
                    date: `Week ${cIdx + 1}`,
                  })
                }
                onMouseLeave={() => setHoveredCell(null)}
                className={`h-3.5 w-3.5 rounded-sm border transition-all duration-150 cursor-pointer ${getColorClass(
                  level
                )}`}
              />
            ))
          )}
        </div>
      </div>

      {/* Legend & Tooltip Bar */}
      <div className="flex items-center justify-between border-t border-amber-900/40 pt-2.5 mt-2 text-[10px] font-mono text-amber-400/70">
        <div>
          {hoveredCell ? (
            <span className="text-amber-200 font-semibold">
              {hoveredCell.count} captures on {hoveredCell.day} ({hoveredCell.date})
            </span>
          ) : (
            <span>342 captures in 2026</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded-sm bg-amber-950/60 border border-amber-900/40" />
          <div className="h-2.5 w-2.5 rounded-sm bg-amber-800/50" />
          <div className="h-2.5 w-2.5 rounded-sm bg-amber-600" />
          <div className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-sm bg-amber-300" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
