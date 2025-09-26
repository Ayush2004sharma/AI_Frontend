"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function Filters({ categories }: { categories: string[] }) {
  const router = useRouter()
  const sp = useSearchParams()

  const [q, setQ] = useState(sp.get("q") ?? "")
  const [cat, setCat] = useState(sp.get("category") ?? "all")
  const [min, setMin] = useState(Number(sp.get("min") ?? 0))
  const [max, setMax] = useState(Number(sp.get("max") ?? 1000))

  useEffect(() => {
    setQ(sp.get("q") ?? "")
    setCat(sp.get("category") ?? "all")
    setMin(Number(sp.get("min") ?? 0))
    setMax(Number(sp.get("max") ?? 1000))
  }, [sp])

  const apply = () => {
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (cat && cat !== "all") params.set("category", cat)
    if (min) params.set("min", String(min))
    if (max && max !== 1000) params.set("max", String(max))
    router.push(`/products?${params.toString()}`)
  }

  const clear = () => router.push("/products")

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="space-y-1">
        <Label htmlFor="q">Search</Label>
        <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={cn("rounded-md border px-2 py-1 text-sm", cat === "all" && "bg-accent")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn("rounded-md border px-2 py-1 text-sm", cat === c && "bg-accent")}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Price range</Label>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            className="w-24"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            aria-label="Minimum price"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="number"
            className="w-24"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            aria-label="Maximum price"
          />
        </div>
        <Slider min={0} max={1000} step={10} value={[Math.min(min, max)]} onValueChange={(v) => setMin(v[0])} />
      </div>

      <div className="flex gap-2">
        <Button onClick={apply}>Apply</Button>
        <Button variant="outline" onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
