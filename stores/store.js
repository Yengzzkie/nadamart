import { create } from "zustand";

export const useIsLoggedInStore = create((set) => ({
    isLoggedIn: true,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))