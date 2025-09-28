"use client"

import { useProduct } from "@/services/hooks"
import { ProductCard } from "@/components/product-card"

type RecommendSectionProps = {
  recentProductIds: string[]
}

export function RecommendSection({ recentProductIds }: RecommendSectionProps) {
  // Filter out invalid IDs
  const validRecentIds = recentProductIds.filter(id => id && id !== "undefined")

  // Fetch products with useProduct hook
  const productsData = validRecentIds.map((id) => useProduct(id))

  const products = productsData.map((p) => p.product).filter(Boolean)
  const loadingRecent = productsData.some((p) => p.isLoading)
  const errorRecent = productsData.find((p) => p.error)?.error

  const mostRecentId = validRecentIds[0]

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Recommended for you</h2>
      <div className="text-sm text-muted-foreground">
        {mostRecentId ? "Based on your recent views." : "Popular picks for you."}
      </div>

      {loadingRecent ? (
        <p className="text-sm text-muted-foreground">Loading recommendations...</p>
      ) : errorRecent ? (
        <p className="text-sm text-red-500">Failed to load recommendations.</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.name + p.created_at} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No recommendations available.</p>
      )}
    </section>
  )
}
