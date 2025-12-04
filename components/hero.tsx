"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { CursorPressureText } from "@/components/cursor-pressure-text"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative section-fullscreen snap-section flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="parallax-layer" data-speed="0.3">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <CursorPressureText text="Creative" />
              <br />
              <span className="text-accent">
                <CursorPressureText text="Developer" />
              </span>
            </h1>
          </div>

          <div className="parallax-layer" data-speed="0.5">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
              데이터를 어떻게 흘려보낼지부터 고민하고,
              <br />
              문제를 구조적으로 해결하는 데 집중하는 개발자입니다.
              <br />
              실시간 분석, AI 기능, 대시보드 같은 제품을 만드는 걸 좋아합니다.
            </p>
          </div>

          <div className="parallax-layer flex flex-wrap gap-4 justify-center pt-8" data-speed="0.7">
            <a
              href="#projects"
              className="px-10 py-5 bg-accent text-accent-foreground rounded-xl font-semibold text-base md:text-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              프로젝트 보러가기
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-secondary text-secondary-foreground rounded-xl font-semibold text-base md:text-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
            >
              연락하기
            </a>
          </div>

          <div className="parallax-layer" data-speed="0.8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-muted-foreground">
              {[
                "실시간 데이터 처리",
                "AI 기반 인터랙션 설계",
                "대시보드 · 시각화 개발",
                "사용성 중심 구조 설계",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-border/60 bg-background/80 backdrop-blur text-foreground/90 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
