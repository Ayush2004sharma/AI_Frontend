"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Filters } from "@/components/filters"
import { ProductGrid } from "@/components/product-grid"
import { useProducts } from "@/services/hooks"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categoriesMock = ["electronics", "fashion", "home", "sports", "beauty"]

export default function ProductsPage() {
  const sp = useSearchParams()
  const params = useMemo(() => {
    const q = sp.get("q") || ""
    const category = sp.get("category") || ""
    const min = sp.get("min") || ""
    const max = sp.get("max") || ""
    const page = sp.get("page") || "1"
    const p: Record<string, any> = {}
    if (q) p.q = q
    if (category) p.category = category
    if (min) p.min = min
    if (max) p.max = max
    if (page) p.page = page
    return p
  }, [sp])

  const { products, isLoading } = useProducts(params)

  const page = Number(sp.get("page") || "1")
  const nextPageQuery = new URLSearchParams(Object.fromEntries(sp.entries()))
  nextPageQuery.set("page", String(page + 1))
  const prevPageQuery = new URLSearchParams(Object.fromEntries(sp.entries()))
  prevPageQuery.set("page", String(Math.max(1, page - 1)))

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6">
          <Filters categories={categoriesMock} />
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading products...</p>
            ) : (
              <>
                <ProductGrid products={products} />
                <div className="flex items-center justify-between pt-2">
                  <Button asChild variant="outline" disabled={page <= 1}>
                    <Link href={`/products?${prevPageQuery.toString()}`}>Previous</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/products?${nextPageQuery.toString()}`}>Next</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
