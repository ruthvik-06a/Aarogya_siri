import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-24">
          {/* Decorative */}
          <div className="absolute top-6 left-6 opacity-20">
            <Leaf className="size-16" />
          </div>
          <div className="absolute bottom-6 right-6 rotate-180 opacity-20">
            <Leaf className="size-16" />
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold md:text-5xl">
              <span className="text-balance">
                Ready to Go Organic?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg opacity-90">
              Join thousands of Karnataka families who have made the switch to
              pure, natural, and organic living.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="rounded-full bg-card px-8 text-card-foreground hover:bg-card/90"
                >
                  Shop Now
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary-foreground/30 px-8 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
