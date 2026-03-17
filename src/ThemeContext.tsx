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
  const [accentColor, setAccentColor] = useState("bg-sky-500");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const accentColorMap: Record<string, string> = {
    "bg-sky-500": "#0ea5e9",
    "bg-indigo-500": "#6366f1",
    "bg-emerald-500": "#10b981",
    "bg-orange-500": "#f97316",
    "bg-rose-500": "#f43f5e"
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const color = accentColorMap[accentColor] || "#0ea5e9";
    root.style.setProperty("--accent-primary", color);
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
