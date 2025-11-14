import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "auto";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("tintly-theme");
    return (saved as Theme) || "light";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("tintly-theme", newTheme);
  };

  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === "auto") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateResolvedTheme);
      return () => mediaQuery.removeEventListener("change", updateResolvedTheme);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === "light") {
      root.setAttribute("data-theme", "light");
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--text-primary", "#000000");
      root.style.setProperty("--text-secondary", "rgba(0,0,0,0.7)");
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.8)");
    } else {
      root.setAttribute("data-theme", "dark");
      root.style.setProperty("--bg-primary", "#0D0F11");
      root.style.setProperty("--text-primary", "#ffffff");
      root.style.setProperty("--text-secondary", "rgba(255,255,255,0.7)");
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.1)");
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}