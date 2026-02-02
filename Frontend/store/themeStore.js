"use client";

import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkMode:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isDarkMode")) || false
      : false,

  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("isDarkMode", JSON.stringify(newTheme));
      }
      return { isDarkMode: newTheme };
    }),
}));

export default useThemeStore;

