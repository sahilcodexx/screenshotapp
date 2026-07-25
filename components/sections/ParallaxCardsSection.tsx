"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Camera, Edit3, FolderOpen, Link2 } from "lucide-react"

const cards = [
  {
    title: "Instant Capture",
    desc: "Full page, region, or active window. One click, zero cropping.",
    icon: Camera,
  },
  {
    title: "Smart Annotations",
    desc: "Highlight, blur, arrow, text. Every tool at your cursor.",
    icon: Edit3,
  },
  {
    title: "Organize & Tag",
    desc: "Auto-tagged by project. Search anything in an instant.",
    icon: FolderOpen,
  },
  {
    title: "Share Instantly",
    desc: "One-click links for Slack, GitHub, Linear, and more.",
    icon: Link2,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
  index,
  scrollYProgress,
}: {
  title: string
  desc: string
  icon: any
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
      className="group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/50"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60 ring-1 ring-zinc-700/40">
          <Icon className="h-5 w-5 text-pink-300" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
