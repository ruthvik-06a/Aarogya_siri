import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export function FeaturedProducts() {
  const featured = products.slice(0, 4)

  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Collection
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">Featured Products</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Handpicked organic essentials from the heart of Karnataka
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              View All Products
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
