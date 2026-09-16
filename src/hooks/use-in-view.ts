import { useEffect, useState } from "react"

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  /** Stop observing after the element first becomes visible. */
  once?: boolean
}

/**
 * Tracks whether an element is in the viewport.
 * Returns a callback ref to attach to the element and the visibility flag.
 */
export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: UseInViewOptions = {}) {
  const [node, setNode] = useState<Element | null>(null)
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  )

  useEffect(() => {
    if (!node || (once && inView)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, once, inView, threshold, rootMargin])

  return [setNode, inView] as const
}
