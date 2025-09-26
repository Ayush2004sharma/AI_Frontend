"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useMe, usePopular } from "@/services/hooks"
import { usePurchases } from "@/services/hooks"
import { PurchaseList } from "@/components/purchase-list"
import { useRecentStore } from "@/context/recent-store"
import { useSimilar } from "@/services/hooks"

export default function DashboardPage() {
  const { user, isLoading } = useMe()
  console.log("User data:", user)
  const { purchases, isLoading: loadingPurchases } = usePurchases()
  const { products: popular } = usePopular()

  // personalized recommendations based on most recent view
  const { recentProductIds } = useRecentStore()
  const mostRecentId = recentProductIds[0]
  const { products: recs } = useSimilar(mostRecentId)

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
          {/* If we have a recent product, show similar; else show popular */}
          {/* Reuse the existing ProductGrid on a future pass if needed */}
          <div className="text-sm text-muted-foreground">
            {mostRecentId ? "Based on your recent views." : "Popular picks for you."}
          </div>
          {/* Keep this simple; Home already shows grids. You can add a grid here similarly if desired. */}
        </section>
      </main>
      <Footer />
    </div>
  )
}
