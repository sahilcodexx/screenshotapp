import { Camera } from "lucide-react"

const groups = [
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
    <footer className="border-t border-zinc-800/40">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-pink-400" />
              <span className="text-sm font-semibold text-white">
                ScreenshotPro
              </span>
            </div>
            <p className="mt-3 text-xs text-zinc-600 leading-relaxed max-w-[180px]">
              Beautiful screenshots for modern teams.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-zinc-500">
                {g.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {g.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-zinc-600 transition-colors duration-150 hover:text-zinc-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-800/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-zinc-600">
            &copy; {new Date().getFullYear()} ScreenshotPro.
          </p>
          <div className="flex items-center gap-5">
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] text-zinc-600 transition-colors duration-150 hover:text-zinc-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
