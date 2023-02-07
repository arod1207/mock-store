import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));

export const adminStore = create(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin: admin }),
    }),
    {
      name: "admin-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
