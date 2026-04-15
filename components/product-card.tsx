"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { addToCart } from "@/lib/cart-store"
import { toast } from "sonner"

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Link href={`/shop/${product.id}`} className="group block w-full">
      <div className="relative w-full overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-xl">
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-red-500 sm:aspect-square sm:h-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount > 0 && (
            <Badge className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground sm:top-3 sm:left-3 sm:text-xs">
              {`${discount}% OFF`}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 p-4 sm:gap-2 sm:p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:tracking-wider">
            {product.category}
          </p>

          <h3 className="font-serif text-2xl font-semibold leading-tight text-card-foreground transition-colors group-hover:text-primary sm:text-lg">
            {product.name}
          </h3>

          <p className="line-clamp-2 text-base leading-7 text-muted-foreground sm:text-sm sm:leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400 sm:size-3.5" />
            <span className="text-sm font-medium text-card-foreground sm:text-xs">
              {product.rating}
            </span>
            <span className="text-sm text-muted-foreground sm:text-xs">
              ({product.reviews})
            </span>
          </div>

          {/* Price + Order */}
          <div className="mt-2 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-card-foreground sm:text-lg">
                {`\u20B9${product.price}`}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through sm:text-sm">
                  {`\u20B9${product.originalPrice}`}
                </span>
              )}
            </div>

            <Button
              size="icon"
              onClick={handleAddToCart}
              className="size-12 rounded-full sm:size-9"
            >
              <ShoppingCart className="size-5 sm:size-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}