"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const text =
  "Every pixel tells a story. ScreenshotPro transforms how your team captures, annotates, and shares visual feedback. No more endless threads of unclear images.";

const words = text.split(" ");

export default function ScrollHighlightSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Finish the reveal while the paragraph is still in the middle area,
    // so all words are visible before reaching the very top.
    offset: ["start 70%", "start 0%"],
  });

  return (
    <section ref={ref} className="relative py-48 md:py-60 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.4] text-zinc-700 font-medium tracking-tight">
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
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

function WordHighlight({
  children,
  index,
  total,
  scrollYProgress,
}: {
  children: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const range = [index / total, Math.min((index + 1 ) / total, 1)];

  const style = {
    opacity: useTransform(scrollYProgress, range, [0.08, 2]),
    color: useTransform(
      scrollYProgress,
      [range[0], (range[0] + range[1]) / 2, range[1]],
      ["#3f3f46", "#f9a8d4", "#fafafa"],
    ),
  };

  return (
    <motion.span style={style} className="inline">
      {children}{" "}
    </motion.span>
  );
}
