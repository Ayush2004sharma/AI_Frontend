"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Filters({ categories }: { categories: string[] }) {
  const router = useRouter()
  const sp = useSearchParams()

  const [cat, setCat] = useState(sp.get("category") ?? "all")
  const [min, setMin] = useState(Number(sp.get("min") ?? 0))
  const [max, setMax] = useState(Number(sp.get("max") ?? 1000))

  useEffect(() => {
    setCat(sp.get("category") ?? "all")
    setMin(Number(sp.get("min") ?? 0))
    setMax(Number(sp.get("max") ?? 1000))
  }, [sp])

  const apply = () => {
    const params = new URLSearchParams()
    if (cat) params.set("category", cat)
    params.set("min", String(min))
    params.set("max", String(max))
    router.push(`/products?${params.toString()}`)
  }

  const clear = () => {
    setCat("all")
    setMin(0)
    setMax(1000)
    router.push("/products")
  }

  return (
    <div className="rounded-md border p-4 space-y-4  text-white">
      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors duration-200",
              "hover:bg-gray-700 hover:border-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
              cat === "all" ? "bg-black text-white border-white" : "bg-gray-800 text-white border-gray-800"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-md border px-3 py-2 text-sm font-medium transition-colors duration-200",
                "hover:bg-gray-700 hover:border-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
                cat === c ? "bg-black text-white border-white" : "bg-gray-800 text-white border-gray-800"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price range</Label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            className="w-24 shadow-sm focus:ring-2 focus:ring-white focus:border-white rounded-md border px-2 py-1 bg-gray-800 text-white"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            aria-label="Minimum price"
          />
          <span className="text-white font-medium">to</span>
          <input
            type="number"
            className="w-24 shadow-sm focus:ring-2 focus:ring-white focus:border-white rounded-md border px-2 py-1 bg-gray-800 text-white"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            aria-label="Maximum price"
          />
        </div>
        {/* White Slider */}
        <Slider
          min={0}
          max={1000}
          step={10}
          value={[min, max]}
          onValueChange={(v) => {
            setMin(v[0])
            setMax(v[1])
          }}
          className="bg-white [&>span]:bg-white [&>span>span]:bg-white"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={apply} className="shadow hover:shadow-md transition bg-black text-white border-white">
          Apply
        </Button>
        <Button
          variant="outline"
          className="shadow hover:shadow-md transition border-white text-white"
          onClick={clear}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
