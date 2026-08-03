"use client";

import { useEffect, useState } from "react";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";

const EASE = [0.23, 1, 0.32, 1] as const;

// The ✳ app icon — matches the hero floating icon exactly
const AppIcon = ({ size = 28 }: { size?: number }) => (
  <div
    style={{ width: size, height: size }}
    className="relative flex items-center justify-center rounded-[9px] bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-600 shadow-md shadow-pink-500/40 ring-1 ring-white/25 shrink-0"
  >
    {/* Glass shine overlay */}
    <div className="absolute inset-0 rounded-[9px] bg-gradient-to-t from-transparent via-white/10 to-white/30" />
    <span className="relative text-white font-bold leading-none select-none">
      <Image
        src="logo.svg"
        alt="App Icon"
        width={1000}
        height={800}
        className="size-4"
      />
    </span>
  </div>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const pillBase = "flex items-center border backdrop-blur-xl shadow-xl shrink-0";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-6 pointer-events-none select-none">
      {/*
        Outer row:
          • Split  → w-fit, gap=16px, NO bg/border/blur (each pill is independent)
          • Merged → w-fit, gap=0,    unified dark pill bg + border + blur
      */}
      <motion.div
        animate={scrolled ? "merged" : "split"}
        variants={{
          split: {
            gap: "16px",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderRadius: "9999px",
            padding: "0px",
            // no blur here — each pill handles its own
          },
          merged: {
            gap: "0px",
            backgroundColor: "rgba(14,14,16,0.88)",
            borderColor: "rgba(255,255,255,0.09)",
            borderRadius: "9999px",
            padding: "0px",
          },
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className="pointer-events-auto flex items-center border"
        // note: no backdrop-blur here — avoids the ghost-bar effect
      >
        {/* ─── LEFT: Logo pill ─────────────────────────────── */}
        <motion.div
          animate={scrolled ? "merged" : "split"}
          variants={{
            split: {
              backgroundColor: "rgba(14,14,16,0.88)",
              borderColor: "rgba(255,255,255,0.09)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "10px",
              paddingRight: "16px",
            },
            merged: {
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "rgba(0,0,0,0)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "14px",
              paddingRight: "12px",
            },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className={pillBase}
        >
          <AppIcon size={28} />
          <span className="ml-2.5 font-bold text-sm text-white tracking-tight">
            framexshot
          </span>
        </motion.div>

        {/* ─── CENTER: Docs | c pill ────────────────── */}
        <motion.nav
          animate={scrolled ? "merged" : "split"}
          variants={{
            split: {
              backgroundColor: "rgba(14,14,16,0.88)",
              borderColor: "rgba(255,255,255,0.09)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "6px",
              paddingRight: "6px",
            },
            merged: {
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "rgba(0,0,0,0)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "6px",
              paddingRight: "6px",
            },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`hidden md:flex items-center border`}
        >
          <a
            href="#docs"
            className="px-4 py-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors duration-150 rounded-full hover:bg-white/5"
          >
            Docs
          </a>
          <span className="h-3.5 w-px bg-white/15 mx-0.5" />
          <a
            href="#download"
            className="px-4 py-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors duration-150 rounded-full hover:bg-white/5"
          >
            Download
          </a>
        </motion.nav>

        {/* ─── RIGHT: GitHub pill ───────────────────────────── */}
        <motion.div
          animate={scrolled ? "merged" : "split"}
          variants={{
            split: {
              backgroundColor: "rgba(14,14,16,0.88)",
              borderColor: "rgba(255,255,255,0.09)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "10px",
              paddingRight: "10px",
            },
            merged: {
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "rgba(0,0,0,0)",
              borderRadius: "9999px",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingLeft: "8px",
              paddingRight: "14px",
            },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`${pillBase}`}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-all duration-150 active:scale-95"
          >
            <GithubIcon />
            <span>69</span>
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
}
