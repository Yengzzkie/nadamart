import { create } from "zustand";

export const useFileUploadStore = create((set) => ({
    imgFiles: [],
    setImgFiles: (imgFiles) => set({ imgFiles }),
}))