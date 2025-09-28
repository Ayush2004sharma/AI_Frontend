"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useCartStore } from "@/context/cart-store"
import { useAuthStore } from "@/context/auth-store"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { items } = useCartStore()
  const { user, token, logout } = useAuthStore()
  const [q, setQ] = useState("")

 const categories = ["electronics", "fashion", "home", "sports", "beauty"] // your valid categories

const onSearch = (e: React.FormEvent) => {
  e.preventDefault()
  const query = q.trim()
  if (!query) return

  const searchParams = new URLSearchParams()
  
  // Always set the search query for product names
  searchParams.set("q", query)

  // If query matches a known category, also apply category filter
  const matchedCategory = categories.find(
    (c) => c.toLowerCase() === query.toLowerCase()
  )
  if (matchedCategory) {
    searchParams.set("category", matchedCategory)
  }

  router.push(`/products?${searchParams.toString()}`)
}


  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link href="/" className="font-semibold text-lg">
          BuyBixx
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className={cn("text-sm hover:underline", pathname?.startsWith("/products") && "font-medium")}
          >
            Products
          </Link>
          <Link href="/dashboard" className={cn("text-sm hover:underline", pathname === "/dashboard" && "font-medium")}>
            Dashboard
          </Link>
        </nav>

        <form onSubmit={onSearch} className="flex-1 max-w-sm hidden md:flex items-center gap-2">
          <Input placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Open cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Link>
          {token ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" aria-label="User dashboard">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* mobile search */}
      <div className="p-4 md:hidden">
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <Input placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>
      </div>
    </header>
  )
}
