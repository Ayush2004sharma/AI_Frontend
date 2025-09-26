"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-pretty text-4xl font-semibold leading-tight md:text-5xl">
              Shop smarter in pure black & white
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              A clean, distraction-free storefront. Browse products, compare details, and check out with a minimal,
              accessible interface that works great in light and dark.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11">
                <Link href="/products">Browse products</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 bg-transparent">
                <Link href="/signup">Create account</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span>Fast checkout</span>
              <span aria-hidden="true">•</span>
              <span>Secure payments</span>
              <span aria-hidden="true">•</span>
              <span>Responsive design</span>
            </div>
          </div>

          <div className="relative">
            {/* Decorative placeholder image with alt intentionally empty to avoid repetition */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
              <img src="/monochrome-ecommerce-hero-preview.png" alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
