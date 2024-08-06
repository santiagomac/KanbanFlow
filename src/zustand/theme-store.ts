import { create } from "zustand";

type Store = {
  theme: string;
  isDark: boolean;
  toggleThemeState: () => void;
};
export const useThemeStore = create<Store>()((set) => ({
  theme: localStorage.getItem("theme") ?? "light",
  isDark: localStorage.getItem("theme") === "dark" ? true : false,
  toggleThemeState: () => set((state) => ({ isDark: !state.isDark })),
}));
