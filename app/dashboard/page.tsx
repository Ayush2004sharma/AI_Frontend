"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useMe } from "@/services/hooks"
import { usePurchases } from "@/services/hooks"
import { PurchaseList } from "@/components/purchase-list"
import { useRecentStore } from "@/context/recent-store"
import { useProduct } from "@/services/hooks"
import { ProductCard } from "@/components/product-card"

export default function DashboardPage() {
  const { user, isLoading } = useMe()
  const { purchases, isLoading: loadingPurchases } = usePurchases()
  const { recentProductIds } = useRecentStore()

  // Filter out invalid IDs
const validRecentIds = recentProductIds.filter(id => id && id !== "undefined");


  // Fetch products with useProduct hook correctly
  const productsData = validRecentIds.map((id) => useProduct(id))

  const products = productsData.map((p) => p.product).filter(Boolean)
  const loadingRecent = productsData.some((p) => p.isLoading)
  const errorRecent = productsData.find((p) => p.error)?.error

  const mostRecentId = validRecentIds[0]
  console.log("🆕 Fetched recent products data:", products)
  console.log("🆕 Recent IDs:", recentProductIds)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6 space-y-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        ) : user ? (
          <div className="rounded-md border p-4">
            <p className="font-medium">Welcome, {user.name || user.email}!</p>
            <p className="text-sm text-muted-foreground">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">You are not logged in.</p>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Purchase history</h2>
          {loadingPurchases ? (
            <p className="text-sm text-muted-foreground">Loading purchases...</p>
          ) : (
            <PurchaseList purchases={purchases} />
          )}
        </section>

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
      </main>
      <Footer />
    </div>
  )
}
