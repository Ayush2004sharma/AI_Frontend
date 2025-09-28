"use client"

import useSWR from "swr"
import { getProduct, getProducts, getPopular, getSimilar, me, getPurchaseHistory } from "./api"

export function useProducts(params: Record<string, any> = {}) {
  // Filter out undefined or null only (allow empty strings, zeros, etc.)
  const cleanParams: Record<string, string | number | boolean> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    cleanParams[k] = v
  }

  const key = ["/products", cleanParams] as const
  const { data, error, isLoading, mutate } = useSWR(key, ([, p]) => getProducts(p))

  return {
    products: data?.items || data || [],
    error,
    isLoading,
    mutate,
    raw: data,
  }
}

export function useProduct(id?: string) {
  const { data, error, isLoading } = useSWR(id ? ["/products", id] : null, ([, pid]) => getProduct(pid))
  return { product: data, error, isLoading }
}

export function usePopular() {
  const { data, error, isLoading } = useSWR(["/recs/popular"], getPopular)
  return { products: data?.items || data || [], error, isLoading }
}

export function useSimilar() {
  const { data, error, isLoading } = useSWR(
    "/recommend",
    () => getSimilar()
  );

  return { products: data?.recommendations || [], error, isLoading };
}

export function useMe() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("buybixx_token")
      : null

  const { data, error, isLoading, mutate } = useSWR(
    token ? ["/auth/me", token] : null,
    () => me()
  )

  return { user: data, error, isLoading, mutate, token }
}


export function usePurchases() {
  const { data, error, isLoading } = useSWR(["/events", { type: "purchase" }], () => getPurchaseHistory())
  return { purchases: data?.items || data || [], error, isLoading }
}
