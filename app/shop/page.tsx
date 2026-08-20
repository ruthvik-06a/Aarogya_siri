import { Suspense } from "react"
import { ShopContent } from "@/components/shop/shop-content"

export const metadata = {
  title: "Shop | Aarogya siri",
  description:
    "Browse our full collection of organic millets, cold-pressed oils, spices, and natural products from Karnataka.",
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  )
}
