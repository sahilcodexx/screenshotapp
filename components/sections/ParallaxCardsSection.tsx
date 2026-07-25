"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const cards = [
  {
    title: "Instant Capture",
    desc: "One click captures exactly what you need — full page, region, or active window. No cropping, no fuss.",
    icon: "⚡",
    gradient: "from-pink-500/20 to-transparent",
  },
  {
    title: "Smart Annotations",
    desc: "Highlight, blur, arrow, and text overlay. Every annotation tool you need, right at your cursor.",
    icon: "✏️",
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    title: "Organize & Tag",
    desc: "Auto-tag screenshots by project, client, or team. Search anything in an instant.",
    icon: "📁",
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    title: "Share Instantly",
    desc: "Generate a shareable link with one click. Works with Slack, GitHub, Linear, and more.",
    icon: "🔗",
    gradient: "from-orange-500/20 to-transparent",
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
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-pink-400/60">
            Features
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            Everything you need
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Built for modern workflows. From capture to share in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  icon,
  gradient,
  index,
  scrollYProgress,
}: {
  title: string
  desc: string
  icon: string
  gradient: string
  index: number
  scrollYProgress: any
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 60 : -60, index % 2 === 0 ? -60 : 60],
  )

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <div className="relative z-10">
        <span className="text-3xl">{icon}</span>
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}
