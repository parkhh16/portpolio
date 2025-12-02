"use client"

import { useEffect, useMemo, useState, type RefObject } from "react"

interface UseScrollBoundTextOptions {
  text: string
  targetRef: RefObject<HTMLElement | null>
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)

export function useScrollBoundText({ text, targetRef }: UseScrollBoundTextOptions) {
  const [displayText, setDisplayText] = useState("")

  const characters = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const duration = 800 // ms
    let frameId: number | null = null
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = clamp(elapsed / duration)
      const nextLength = Math.floor(characters.length * progress)

      setDisplayText(characters.slice(0, nextLength).join(""))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      } else {
        frameId = null
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTime = null
            if (frameId !== null) {
              window.cancelAnimationFrame(frameId)
            }
            frameId = window.requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [characters, targetRef])

  return displayText
}
