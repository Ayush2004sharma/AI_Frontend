"use client"

type Purchase = {
  id?: string
  created_at?: string
  item_id?: string
  meta?: any
  total?: number
  [key: string]: any
}

export function PurchaseList({ purchases }: { purchases: Purchase[] }) {
  if (!purchases?.length) {
    return <p className="text-sm text-muted-foreground">No purchases yet.</p>
  }
  return (
    <div className="space-y-3">
      {purchases.map((p, idx) => (
        <div key={p.id || idx} className="rounded-md border p-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Order {p.id || p.item_id || `#${idx + 1}`}</p>
              {p.created_at && (
                <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {/* Prefer explicit total, else infer from meta */}$
                {typeof p.total === "number"
                  ? p.total.toFixed(2)
                  : typeof p?.meta?.total === "number"
                    ? p.meta.total.toFixed(2)
                    : "—"}
              </p>
              {Array.isArray(p?.meta?.items) && (
                <p className="text-xs text-muted-foreground">
                  {p.meta.items.reduce((s: number, it: any) => s + (it.q || it.quantity || 1), 0)} items
                </p>
              )}
            </div>
          </div>
          {p?.meta && (
            <details className="mt-2">
              <summary className="text-xs text-muted-foreground cursor-pointer">Details</summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">{JSON.stringify(p.meta, null, 2)}</pre>
            </details>
          )}
        </div>
      ))}
    </div>
  )
}
