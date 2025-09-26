"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/context/cart-store"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, setQuantity } = useCartStore()

  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Your cart</h1>

        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((i, index) => (
                <div
                  key={i.id ?? `${i.title}-${index}`}
                  className="flex items-center gap-4 rounded-md border p-3"
                >
                  <img
                    alt={i.title}
                    className="h-16 w-16 rounded object-cover bg-muted"
                    src={i.image || "/placeholder.svg?height=64&width=64&query=product-thumbnail"}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{i.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ${i.price?.toFixed?.(2) ?? i.price}
                    </p>
                  </div>
                  <input
                    type="number"
                    min={1}
                    className="w-16 rounded border px-2 py-1"
                    value={i.quantity}
                    onChange={(e) =>
                      setQuantity(i.id, Math.max(1, Number(e.target.value)))
                    }
                    aria-label={`Quantity for ${i.title}`}
                  />
                  <Button variant="ghost" onClick={() => removeItem(i.id)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-md border p-4 space-y-3 h-fit">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
