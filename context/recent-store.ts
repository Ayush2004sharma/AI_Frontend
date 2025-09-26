"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type RecentState = {
  recentProductIds: string[]
  addRecent: (id: string) => void
  clear: () => void
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      recentProductIds: [],
      addRecent: (id) => {
        const list = get().recentProductIds.filter((x) => x !== id)
        // put newest at the front, keep up to 10
        set({ recentProductIds: [id, ...list].slice(0, 10) })
      },
      clear: () => set({ recentProductIds: [] }),
    }),
    { name: "buybixx_recent" },
  ),
)
