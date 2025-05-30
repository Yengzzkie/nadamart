import { create } from "zustand";

export const useFileUploadStore = create((set) => ({
    imgFiles: [],
    setImgFiles: (imgFiles) => set({ imgFiles }),
}))

export const useStoreUserData = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export const usePostSearchResult = create((set) => ({
  postSearchResult: null,
  setPostSearchResult: (data) => set({ postSearchResult: data }),
}));
