import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Pass a stable (module-level) array so the observer isn't recreated each render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
