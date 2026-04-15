import { notFound } from "next/navigation"
import { getProductById, products } from "@/lib/products"
import { ProductDetailContent } from "@/components/shop/product-detail-content"

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.name} | Aarogya siri`,
    description: product.description,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  // Get related products (same category, exclude current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return <ProductDetailContent product={product} relatedProducts={related} />
}
