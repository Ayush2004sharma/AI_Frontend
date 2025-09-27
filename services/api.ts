export const API_BASE = process.env.NEXT_PUBLIC_BUYBIXX_API_URL || ""

type FetchOptions = {
  method?: string
  body?: any
  headers?: Record<string, string>
  auth?: boolean
  cache?: RequestCache
}

export async function apiFetch<T = any>(path: string, opts: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE}${path}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  }

  if (opts.auth) {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("buybixx_token") : null
    if (token) headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method: opts.method || "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: opts.cache || "no-store",
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed: ${res.status}`)
  }
  const contentType = res.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return res.json()
  }
  // @ts-ignore
  return null
}

// ------------------- AUTH -------------------

export async function login(email: string, password: string) {
  // ✅ Match backend: accessToken, tokenType
  return apiFetch<{ accessToken: string; tokenType?: string }>("/auth/login", {
    method: "POST",
    body: { email, password },
  })
}

export async function signup(name: string, email: string, password: string) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: { name, email, password },
  })
}

export async function me() {
  return apiFetch("/auth/me", { auth: true })
}

// ------------------- PRODUCTS -------------------

export async function getProducts(params?: Record<string, string | number | boolean>) {
  const search = params
    ? "?" + new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))).toString()
    : ""
  return apiFetch(`/products${search}`)
}

export async function getProduct(id: string) {
  return apiFetch(`/products/${id}`)
}

// CRUD
export async function createProduct(data: any) {
  return apiFetch("/products", { method: "POST", body: data, auth: true })
}
export async function updateProduct(id: string, data: any) {
  return apiFetch(`/products/${id}`, { method: "PUT", body: data, auth: true })
}
export async function deleteProduct(id: string) {
  return apiFetch(`/products/${id}`, { method: "DELETE", auth: true })
}

// ------------------- RECOMMENDATIONS -------------------

export async function getPopular() {
  return apiFetch("/recs/popular")
}

export async function getSimilar() {
  const token = localStorage.getItem("token"); // or from auth context
  return apiFetch("/recommend", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


// ------------------- EVENTS -------------------

export async function trackEvent(event: { type: "view" | "click" | "purchase"; item_id?: string; meta?: any }) {
  return apiFetch("/events", { method: "POST", body: event, auth: true })
}

// ------------------- PURCHASE HISTORY -------------------

export async function getPurchaseHistory() {
  return apiFetch("/events?type=purchase", { auth: true })
}
