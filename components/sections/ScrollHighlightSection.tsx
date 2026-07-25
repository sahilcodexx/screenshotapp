"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const paragraph =
  "Every pixel tells a story. ScreenshotPro transforms how your team captures, annotates, and shares visual feedback. No more endless threads of unclear images — just crisp, contextual screenshots that communicate exactly what you mean. From design reviews to bug reports, make every capture count."

const words = paragraph.split(" ")

export default function ScrollHighlightSection() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  })

  return (
    <section className="relative py-48" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-zinc-600 font-medium">
          {words.map((word, i) => (
            <WordHighlight
              key={i}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            >
              {word}
            </WordHighlight>
          ))}
        </motion.p>
      </div>
    </section>
  )
}

function WordHighlight({
  children,
  index,
  total,
  scrollYProgress,
}: {
  children: string
  index: number
  total: number
  scrollYProgress: any
}) {
  const start = index / total
  const end = Math.min((index + 1) / total, 1)

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
  const color = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    ["#52525b", "#f472b6", "#fafafa"],
  )

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline transition-colors duration-75"
    >
      {children}{" "}
    </motion.span>
  )
}
