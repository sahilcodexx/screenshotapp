import HeroSection from "@/components/sections/HeroSection"
import ScrollHighlightSection from "@/components/sections/ScrollHighlightSection"
import ParallaxCardsSection from "@/components/sections/ParallaxCardsSection"
import BentoGridSection from "@/components/sections/BentoGridSection"
import FooterSection from "@/components/sections/FooterSection"

export default function Page() {
  return (
    <main className="bg-black">
      <HeroSection />
      <ScrollHighlightSection />
      <ParallaxCardsSection />
      <BentoGridSection />
      <FooterSection />
    </main>
  )
}
