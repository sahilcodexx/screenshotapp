"use client"

import { motion } from "motion/react"
import {
  Eye,
  Shield,
  Keyboard,
  Users,
  Blocks,
  BarChart3,
  Palette,
} from "lucide-react"

const items = [
  {
    title: "Real-time Preview",
    desc: "See exactly how it'll look before you capture. WYSIWYG at its best.",
    icon: Eye,
    span: "md:col-span-2",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    title: "99.9% Uptime",
    desc: "Enterprise infrastructure. Always accessible.",
    icon: Shield,
    color: "from-purple-500/20 to-violet-500/10",
  },
  {
    title: "Keyboard First",
    desc: "Every action has a shortcut. Never touch the mouse.",
    icon: Keyboard,
    color: "from-cyan-500/20 to-teal-500/10",
  },
  {
    title: "Team Workspaces",
    desc: "Shared libraries, annotation workflows, approval flows.",
    icon: Users,
    span: "md:col-span-2",
    color: "from-orange-500/20 to-amber-500/10",
  },
  {
    title: "Integrations",
    desc: "Slack, GitHub, Jira, Linear, Figma — your screenshots flow where work happens.",
    icon: Blocks,
    span: "md:col-span-2",
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "Analytics",
    desc: "Know when your team has seen the feedback.",
    icon: BarChart3,
    color: "from-rose-500/20 to-pink-500/10",
  },
  {
    title: "Custom Branding",
    desc: "White-label everything. Your brand, your domain.",
    icon: Palette,
    color: "from-blue-500/20 to-indigo-500/10",
  },
]

export default function BentoGridSection() {
  return (
    <section className="relative py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
            Everything Included
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One tool, endless possibilities
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
            More than screenshots. A complete visual communication platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`${item.span || ""} group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all duration-500 hover:border-zinc-700/70`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent blur-sm opacity-30" />
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60 ring-1 ring-white/5">
                    <item.icon className="h-4 w-4 text-zinc-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
