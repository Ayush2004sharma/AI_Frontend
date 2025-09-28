import { ProductCard, type Product } from "./product-card"
export function ProductGrid({ products }: { products: Product[] }) {

  if (!products?.length) {
    return <p className="text-sm text-muted-foreground">No products found.</p>
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.name + p.created_at} product={p} />
      ))}
    </div>
  )
}
