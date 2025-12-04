"use client"

import { useEffect, useRef, useState } from "react"
import RotatingText from "@/components/rotating-text"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-fullscreen snap-section bg-secondary/30 py-16 sm:py-20 md:py-24 lg:py-28 flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              호기심 덩어리
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-2">
                <RotatingText
                  texts={["사용자를 배려하는", "흐름을 설계하는", "구조를 재해석하는"]}
                  mainClassName="inline-flex px-1.5 sm:px-2 md:px-3 rounded-lg bg-accent text-accent-foreground overflow-hidden py-0.5 sm:py-1 md:py-1.5"
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.03}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3500}
                />
                <span className="text-accent">개발자</span>
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-medium leading-relaxed">
              저는 새로운 문제를 보면 자연스럽게 원인을 탐색하는 타입입니다. 겉에서 보이는 현상보다, 그 뒤에서 어떤 흐름이
              만들어지고 있는지 먼저 살펴봅니다.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 leading-relaxed">
              복잡한 구조를 단순하게 재해석하고, 사용자가 자연스럽게 받아들일 수 있는 방식으로 정리하는 일을 좋아합니다.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 leading-relaxed">
              기능 하나를 만들 때도 “왜 이렇게 움직일까?”, “더 나은 구조는 없을까?”를 고민하며 서비스 전체의 일관성과 사용자
              경험을 함께 고려합니다.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-foreground font-semibold leading-relaxed">
              저는 탐구심이 많고, 구조를 중요하게 생각하며, 사용자가 편하게 느끼는 경험을 만드는 개발자입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

