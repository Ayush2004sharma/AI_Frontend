"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useProduct, useSimilar } from "@/services/hooks"
import { useCartStore } from "@/context/cart-store"
import Image from "next/image"
import { ProductGrid } from "@/components/product-grid"
import { useEffect } from "react"
import { trackEvent } from "@/services/api"
import { useRecentStore } from "@/context/recent-store"

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  console.log("Product ID from params:", id) // 👈 log id here
  const { product, isLoading } = useProduct(id)
  const { products: similar } = useSimilar(id)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (id) {
      trackEvent({ type: "view", item_id: String(id) }).catch(() => null)
      useRecentStore.getState().addRecent(String(id))
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">Loading...</main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">Product not found.</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
            {product.image ? (
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            ) : (
              <img
                alt={product.title}
                className="h-full w-full object-cover"
                src="/product-image-placeholder-big.png"
              />
            )}
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            {product.description && <p className="text-muted-foreground">{product.description}</p>}
            <p className="text-xl font-semibold">${product.price?.toFixed?.(2) ?? product.price}</p>
            <div className="flex gap-3">
              <Button onClick={() => addItem(product, 1)}>Add to cart</Button>
              <Button
                variant="outline"
                onClick={() => trackEvent({ type: "click", item_id: String(product.id) }).catch(() => null)}
              >
                Track Click
              </Button>
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Similar items</h2>
          <ProductGrid products={similar} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
