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
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 rounded-full bg-accent px-2 py-1 text-[10px] text-accent-foreground sm:text-xs">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {product.category}
          </p>

          <h3 className="line-clamp-2 font-serif text-lg font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary sm:text-xl">
            {product.name}
          </h3>

          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-card-foreground">
              {product.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price + Order */}
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-card-foreground sm:text-2xl">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <Button
              size="icon"
              onClick={handleAddToCart}
              className="size-9 rounded-full sm:size-10"
            >
              <ShoppingCart className="size-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}