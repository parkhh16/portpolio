"use client"

import { ArrowDown } from "lucide-react"
import { CursorPressureText } from "@/components/cursor-pressure-text"
import Particles from "@/components/particles"

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen snap-section flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5">
        <Particles
          particleColors={["#a855f7"]}
          particleCount={200}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          sizeRandomness={1}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={20}
          pixelRatio={1}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 pb-16 md:pb-20">
          <div className="parallax-layer" data-speed="0.3">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance mb-6 leading-[1.05] select-none cursor-default"
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
              데이터와 사용자의 행동을
              <br />
              실시간 로그, 대시보드, AI 리포트처럼
              <br />
              “보고 바로 이해되는 도구”로 만드는 개발자입니다.
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
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/80 backdrop-blur text-muted-foreground/90 shadow-sm transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 hover:text-foreground hover:-translate-y-1 select-none cursor-default"
                >
                  <span>{item}</span>
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

