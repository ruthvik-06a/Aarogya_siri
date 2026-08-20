import { NextResponse } from "next/server"
import { products } from "@/lib/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filtered = [...products]

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  return NextResponse.json(filtered)
}
