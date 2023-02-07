import { create } from "zustand";

export const urlStore = create((set) => ({
  url: "",
  setUrl: (url) => set({ url: url }),
}));
