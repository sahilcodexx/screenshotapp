"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Camera, Edit3, FolderOpen, Link2 } from "lucide-react"

const cards = [
  {
    title: "Instant Capture",
    desc: "Full page, region, or active window. One click, zero cropping.",
    icon: Camera,
    color: "from-pink-500 to-rose-500",
    glow: "group-hover:shadow-pink-500/25",
  },
  {
    title: "Smart Annotations",
    desc: "Highlight, blur, arrow, text. Every tool at your cursor.",
    icon: Edit3,
    color: "from-purple-500 to-violet-500",
    glow: "group-hover:shadow-purple-500/25",
  },
  {
    title: "Organize & Tag",
    desc: "Auto-tagged by project. Search anything in an instant.",
    icon: FolderOpen,
    color: "from-cyan-500 to-teal-500",
    glow: "group-hover:shadow-cyan-500/25",
  },
  {
    title: "Share Instantly",
    desc: "One-click links for Slack, GitHub, Linear, and more.",
    icon: Link2,
    color: "from-orange-500 to-amber-500",
    glow: "group-hover:shadow-orange-500/25",
  },
]

export default function ParallaxCardsSection() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
            Features
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
            From capture to share in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <ParallaxCard
              key={i}
              {...card}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ParallaxCard({
  title,
  desc,
  icon: Icon,
  color,
  glow,
  index,
  scrollYProgress,
}: {
  title: string
  desc: string
  icon: any
  color: string
  glow: string
  index: number
  scrollYProgress: any
}) {
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 60 : -60, index % 2 === 0 ? -60 : 60])

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`group relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all duration-500 hover:border-zinc-700/80 hover:bg-zinc-900/50 ${glow} hover:shadow-2xl`}
    >
      {/* Gradient glow on hover */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${color} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-15`}
      />

      {/* Inner border glow */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[15px] bg-zinc-900/90 transition-all duration-500 group-hover:bg-zinc-900/80" />

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} blur-md opacity-30`}
          />
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800/80 ring-1 ring-white/5">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-[15px] font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
