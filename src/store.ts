import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  mode: "dark" | "light";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      toggleTheme: () =>
        set(({ mode }) => ({ mode: mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme",
    }
  )
);