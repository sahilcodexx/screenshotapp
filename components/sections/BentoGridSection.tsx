"use client"

import { motion } from "motion/react"

const items = [
  {
    title: "Real-time Preview",
    desc: "See exactly how your screenshot will look before you capture. WYSIWYG at its finest.",
    size: "col-span-1 md:col-span-2 row-span-1",
    gradient: "from-pink-500/10 to-transparent",
    border: "border-pink-500/10",
  },
  {
    title: "99.9% Uptime",
    desc: "Your screenshots are always accessible. Enterprise-grade infrastructure.",
    size: "col-span-1 row-span-1",
    gradient: "from-purple-500/10 to-transparent",
    border: "border-purple-500/10",
  },
  {
    title: "Keyboard First",
    desc: "Every action has a shortcut. Move at the speed of thought.",
    size: "col-span-1 row-span-1",
    gradient: "from-cyan-500/10 to-transparent",
    border: "border-cyan-500/10",
  },
  {
    title: "Team Workspaces",
    desc: "Shared libraries, consistent annotations, and approval workflows built in. Your team stays in sync.",
    size: "col-span-1 md:col-span-2 row-span-1",
    gradient: "from-orange-500/10 to-transparent",
    border: "border-orange-500/10",
    wide: true,
  },
  {
    title: "Integrations",
    desc: "Slack, GitHub, Jira, Linear, Figma. Your screenshots flow where your work happens.",
    size: "col-span-1 md:col-span-1 row-span-1",
    gradient: "from-emerald-500/10 to-transparent",
    border: "border-emerald-500/10",
  },
  {
    title: "Analytics",
    desc: "See who viewed what and when. Know exactly when your team has seen the feedback.",
    size: "col-span-1 md:col-span-1 row-span-1",
    gradient: "from-rose-500/10 to-transparent",
    border: "border-rose-500/10",
  },
  {
    title: "Custom Branding",
    desc: "White-label everything. Your brand, your domain, your screenshots.",
    size: "col-span-1 md:col-span-2 row-span-1",
    gradient: "from-blue-500/10 to-transparent",
    border: "border-blue-500/10",
  },
]

export default function BentoGridSection() {
  return (
    <section className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-pink-400/60">
            Everything Included
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
            One tool, endless possibilities
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            More than just screenshots. A complete visual communication platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`${item.size} relative group rounded-2xl border ${item.border} bg-zinc-900/30 p-8 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/50`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
