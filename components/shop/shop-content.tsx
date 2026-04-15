"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products, categories, type Category } from "@/lib/products"

export function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get("category") as Category) || "All"
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f4fbf4]">
      {/* Header */}
      <div className="bg-primary py-10 text-primary-foreground sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Our Products
          </h1>
          <p className="mt-3 text-sm opacity-90 sm:text-base md:mt-4 md:text-lg">
            Pure, organic, and sustainably sourced from Karnataka
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-8 md:py-12 lg:px-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:mb-10 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4 py-2 whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-full border bg-white pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center sm:py-20">
            <p className="text-base text-muted-foreground sm:text-lg">
              No products found. Try a different search or category.
            </p>
          </div>
        )}

        {/* Results count */}
        <div className="mt-6 text-center text-sm text-muted-foreground sm:mt-8">
          {`Showing ${filteredProducts.length} of ${products.length} products`}
        </div>
      </div>
    </div>
  )
}