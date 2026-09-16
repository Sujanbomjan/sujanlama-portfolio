import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"

import {
  ThemeContext,
  type ResolvedTheme,
  type Theme,
} from "@/components/theme/theme-context"

// Keep in sync with the inline script in index.html.
const STORAGE_KEY = "theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"

function readStoredTheme(fallback: Theme): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : fallback
  } catch {
    return fallback
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(defaultTheme)
  )
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)
  const resolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = () => setSystemTheme(media.matches ? "dark" : "light")
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    // Suspend transitions while swapping themes so colors don't animate.
    const pause = document.createElement("style")
    pause.textContent = "*,*::before,*::after{transition:none!important}"
    document.head.appendChild(pause)

    root.classList.toggle("dark", resolvedTheme === "dark")
    root.style.colorScheme = resolvedTheme

    void window.getComputedStyle(document.body).opacity
    const timer = window.setTimeout(() => pause.remove(), 1)
    return () => {
      window.clearTimeout(timer)
      pause.remove()
    }
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
    setThemeState(next)
  }, [])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
