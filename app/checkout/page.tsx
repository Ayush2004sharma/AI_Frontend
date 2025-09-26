"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/context/cart-store"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/services/api"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, clear } = useCartStore()
  const router = useRouter()
  const total = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0)

  const onPlaceOrder = async () => {
    try {
      await trackEvent({ type: "purchase", meta: { items: items.map((i) => ({ id: i.id, q: i.quantity })), total } })
    } catch {}
    clear()
    router.replace("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items to checkout.</p>
        ) : (
          <div className="rounded-md border p-4 space-y-3">
            <p className="text-sm text-muted-foreground">This is a simple mock checkout.</p>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Button onClick={onPlaceOrder}>Place order</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
