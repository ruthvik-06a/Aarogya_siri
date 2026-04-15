"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Star,
  ArrowLeft,
  Truck,
  Shield,
  Leaf,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { addToCart } from "@/lib/cart-store"
import { toast } from "sonner"
import type { Product } from "@/lib/products"

export function ProductDetailContent({
  product,
  relatedProducts,
}: {
  product: Product
  relatedProducts: Product[]
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  function handleAddToCart() {
    addToCart(product, quantity)
    toast.success(`${product.name} added to cart`)
    setQuantity(1)
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 ${imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-base px-3 py-1">
                {`${discount}% OFF`}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {`\u20B9${product.price}`}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {`\u20B9${product.originalPrice}`}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                / {product.weight}
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-muted-foreground">
              {product.longDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="size-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center font-medium text-foreground">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="size-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 rounded-full text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 size-5" />
                {`Add to Cart \u2014 \u20B9${product.price * quantity}`}
              </Button>
            </div>

            {/* Perks */}
            <div className="mt-4 grid gap-3 rounded-xl border border-border bg-card p-6 sm:grid-cols-3">
              {[
                { icon: Truck, label: "Cash on delivery" },
                { icon: Shield, label: "Quality guaranteed" },
                { icon: Leaf, label: "100% organic" },
              ].map((perk) => (
                <div
                  key={perk.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <perk.icon className="size-5 shrink-0 text-primary" />
                  <span>{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
