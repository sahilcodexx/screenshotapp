"use client"

import { motion } from "motion/react"

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Docs", "API", "Community", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
]

export default function FooterSection() {
  return (
    <footer className="relative border-t border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
              ScreenshotPro
            </span>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
              Beautiful screenshots for modern teams.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} ScreenshotPro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-zinc-600 transition-colors duration-150 hover:text-zinc-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
