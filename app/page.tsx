"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { usePopular } from "@/services/hooks";
import Link from "next/link";
import { useMe } from "@/services/hooks";
import { useSimilar } from "@/services/hooks";
import { useRecentStore } from "@/context/recent-store";
import { RecommendSection } from "@/components/recommend";

export default function HomePage() {
  const { products: popular, isLoading: loadingPopular } = usePopular();
  const { user } = useMe();
  const { recentProductIds } = useRecentStore();
  const mostRecentId = recentProductIds[0];
  const { products: recs, isLoading: loadingRecs } = useSimilar();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="space-y-5">
              <h1 className="text-pretty text-4xl font-semibold leading-tight md:text-5xl">
                Shop smarter in pure black & white
              </h1>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                A clean, distraction-free storefront. Browse products, compare
                details, and check out with a minimal, accessible interface that
                works great in light and dark.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/products">
                  <Button className="h-11">Browse Products</Button>
                </Link>
                {!user ? (
                  <Link href="/signup">
                    <Button variant="outline" className="h-11 bg-transparent">
                      Get Started
                    </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="outline" className="h-11 bg-transparent">
                      Go to Dashboard
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                <span>Fast checkout</span>
                <span aria-hidden="true">•</span>
                <span>Secure payments</span>
                <span aria-hidden="true">•</span>
                <span>Responsive design</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
                <img
                  src="/monochrome-ecommerce-product-collage.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Popular right now</h2>
            <Link href="/products" className="text-sm hover:underline">
              View all
            </Link>
          </div>
          {loadingPopular ? (
            <p className="text-sm text-muted-foreground">
              Loading popular products...
            </p>
          ) : (
            <ProductGrid products={popular} />
          )}
        </section>

        {user && mostRecentId && (
          <section className="space-y-4">
            
                 {/* ✅ Extracted Recommend Section */}
                     <RecommendSection recentProductIds={recentProductIds} />
                    
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
