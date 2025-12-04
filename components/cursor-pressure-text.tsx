"use client"

import { useEffect, useRef } from "react"

type CursorPressureTextProps = {
  text: string
  className?: string
}

type Point = { x: number; y: number }

const distance = (a: Point, b: Point) => {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

export function CursorPressureText({ text, className }: CursorPressureTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const centersRef = useRef<Point[]>([])
  const radiusRef = useRef<number>(300)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spans = spansRef.current
    const centers: Point[] = []

    spans.forEach((span) => {
      if (!span) return
      const rect = span.getBoundingClientRect()
      centers.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    })

    centersRef.current = centers

    const containerRect = container.getBoundingClientRect()
    // 텍스트 길이에 따라 반경을 조정하고, 최대 반경 제한
    radiusRef.current = Math.min(260, Math.max(140, (containerRect.width || 1) * 0.35))

    const handleMove = (event: MouseEvent | TouchEvent) => {
      let x = 0
      let y = 0

      if ("touches" in event) {
        const t = event.touches[0]
        if (!t) return
        x = t.clientX
        y = t.clientY
      } else {
        x = event.clientX
        y = event.clientY
      }

      const baseWeight = 500
      const baseScale = 1
      const maxExtraWeight = 250
      const maxExtraScale = 0.35
      const radius = radiusRef.current || 220

      spans.forEach((span, index) => {
        if (!span) return
        const center = centersRef.current[index]
        if (!center) return

        const d = distance({ x, y }, center)
        const raw = Math.max(0, 1 - d / radius)

        // 멀리 있는 글자는 완전히 기본 상태 유지
        if (raw <= 0.25) {
          span.style.transform = `scale(${baseScale})`
          span.style.fontVariationSettings = `"wght" ${baseWeight}`
          return
        }

        const strength = raw * raw

        const scale = baseScale + strength * maxExtraScale
        const weight = baseWeight + strength * maxExtraWeight

        span.style.transform = `scale(${scale})`
        span.style.fontVariationSettings = `"wght" ${weight}`
      })
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove, { passive: true })

    const handleResize = () => {
      const spans = spansRef.current
      const centers: Point[] = []

      spans.forEach((span) => {
        if (!span) return
        const rect = span.getBoundingClientRect()
        centers.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      })

      centersRef.current = centers

      const container = containerRef.current
      if (container) {
        const containerRect = container.getBoundingClientRect()
        radiusRef.current = Math.min(260, Math.max(140, (containerRect.width || 1) * 0.35))
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={`c-${i}`}
          ref={(el) => (spansRef.current[i] = el)}
          style={{
            display: "inline-block",
            transition: "transform 0.08s ease-out",
            fontVariationSettings: `"wght" 500`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
