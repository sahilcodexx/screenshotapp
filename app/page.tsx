import Navbar from "@/components/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import ScrollHighlightSection from "@/components/sections/ScrollHighlightSection"

export default function Page() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      {/* Fixed frosted blur bar at bottom — blends with black bg */}
      <div
        aria-hidden
        className="fixed inset-x-0 bottom-0 h-40 pointer-events-none z-50"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "linear-gradient(to top, #000000 0%, #000000 20%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
        }}
      />

      <HeroSection />
      <ScrollHighlightSection />
    </main>
  )
}
