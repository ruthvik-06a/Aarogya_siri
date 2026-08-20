import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StorySection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/about-farm.jpg"
              alt="Organic farm in Karnataka"
              width={600}
              height={400}
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Story
            </p>
            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              <span className="text-balance">
                From Karnataka Farms to Your Table
              </span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
                Aarogya siri was born from a deep love for Karnataka{"'"}s rich
              agricultural heritage. We work directly with local farmers who
              follow traditional, chemical-free farming practices to bring you
              the purest organic products.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Every product tells a story of dedication, sustainability, and the
              timeless wisdom of natural farming that has nourished generations.
            </p>
            <div>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Read Our Full Story
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
