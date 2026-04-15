"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCanvas } from "@/components/hero-canvas"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Animated Background */}
      <HeroCanvas />

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 text-center lg:px-8">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            <span>100% Organic from Karnataka Farms</span>
          </div>
        </div>

        <h1
          className="animate-fade-in-up font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-balance">
            Nature{"'"}s Purest,{" "}
            <span className="text-primary">Delivered Fresh</span>
          </span>
        </h1>

        <p
          className="animate-fade-in-up mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Discover premium organic millets, cold-pressed oils, and natural
          products sourced directly from traditional Karnataka farms to your
          doorstep.
        </p>

        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-8 text-base">
              Explore Products
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base"
            >
              Our Story
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { label: "Organic Products", value: "50+" },
            { label: "Happy Customers", value: "2,000+" },
            { label: "Karnataka Farms", value: "100+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="fill-secondary">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  )
}
