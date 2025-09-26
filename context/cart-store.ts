"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/components/product-card"

export type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, qty: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1) => {
        const items = get().items.slice()
        const idx = items.findIndex((i) => i.id === product.id)
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + qty }
        } else {
          items.push({ ...product, quantity: qty })
        }
        set({ items })
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQuantity: (id, qty) => set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)) }),
      clear: () => set({ items: [] }),
    }),
    { name: "buybixx_cart" },
  ),
)
