import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { BenefitsSection } from "@/components/home/benefits-section"
import { StorySection } from "@/components/home/story-section"
import { CtaSection } from "@/components/home/cta-section"
import { FloatingLeaves } from "@/components/floating-leaves"

export default function HomePage() {
  return (
    <div className="relative">
      <FloatingLeaves />
      <HeroSection />
      <FeaturedProducts />
      <BenefitsSection />
      <StorySection />
      <CtaSection />
    </div>
  )
}
