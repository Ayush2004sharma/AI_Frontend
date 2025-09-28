"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useMe, usePurchases } from "@/services/hooks"
import { PurchaseList } from "@/components/purchase-list"
import { useRecentStore } from "@/context/recent-store"
import { RecommendSection } from "@/components/recommend"


export default function DashboardPage() {
  const { user, isLoading } = useMe()
  const { purchases, isLoading: loadingPurchases } = usePurchases()
  const { recentProductIds } = useRecentStore()

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

        {/* ✅ Extracted Recommend Section */}
        <RecommendSection recentProductIds={recentProductIds} />
      </main>
      <Footer />
    </div>
  )
}
