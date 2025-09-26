"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginApi, signup as signupApi } from "@/services/api";

type User = {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
};

type AuthState = {
  token: string | null;
  user: User | null;
  setUser: (u: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      // set user details after fetching profile
      setUser: (u) => set({ user: u }),

      // login flow
      login: async (email, password) => {
        const res = await loginApi(email, password);
        const token = res?.accessToken; // 👈 match backend field

        if (token) {
          localStorage.setItem("buybixx_token", token);
          set({ token });
        }
      },

      // signup flow
      signup: async (name, email, password) => {
        await signupApi(name, email, password);
      },

      // logout flow
      logout: () => {
        localStorage.removeItem("buybixx_token");
        set({ token: null, user: null });
      },
    }),
    { name: "buybixx_auth" }
  )
);
