import { create } from "zustand";

export const useIsLoggedInStore = create((set) => ({
    isLoggedIn: true,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))

export const useFileUploadStore = create((set) => ({
    imgFiles: [],
    setImgFiles: (imgFiles) => set({ imgFiles }),
}))