"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("bg-indigo-500");

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (currentTheme: string) => {
      if (currentTheme === "dark") {
        root.classList.add("dark");
      } else if (currentTheme === "light") {
        root.classList.remove("dark");
      } else if (currentTheme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    // Listen for system theme changes if set to system
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) root.classList.add("dark");
        else root.classList.remove("dark");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const accentColorMap: Record<string, { primary: string; muted: string; dark: string }> = {
    "bg-sky-500": { primary: "#0ea5e9", muted: "#f0f9ff", dark: "#0369a1" },
    "bg-indigo-500": { primary: "#6366f1", muted: "#eef2ff", dark: "#4338ca" },
    "bg-emerald-500": { primary: "#10b981", muted: "#ecfdf5", dark: "#047857" },
    "bg-orange-500": { primary: "#f97316", muted: "#fff7ed", dark: "#c2410c" },
    "bg-rose-500": { primary: "#f43f5e", muted: "#fff1f2", dark: "#be123c" }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const colors = accentColorMap[accentColor] || accentColorMap["bg-sky-500"];
    root.style.setProperty("--accent-primary", colors.primary);
    root.style.setProperty("--accent-muted", colors.muted);
    root.style.setProperty("--accent-dark", colors.dark);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
