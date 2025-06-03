import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isValidated: boolean;
  setIsValidated: (isValidated: boolean) => void;
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // ─── State ─────────────────────────────────────────────
  isAuth: false,
  isValidated: false,
  token: "",

  // ─── Actions ───────────────────────────────────────────
  setIsAuth: (value) => set({ isAuth: value }),
  setIsValidated: (value) => set({ isValidated: value }),
  setToken: (t) => set({ token: t }),
}));
