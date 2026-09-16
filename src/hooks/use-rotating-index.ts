import { useEffect, useState } from "react"

/** Cycles through `0..length-1` every `interval` ms. */
export function useRotatingIndex(length: number, interval = 3000) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (length < 2) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % length),
      interval
    )
    return () => window.clearInterval(timer)
  }, [length, interval])

  return index
}
