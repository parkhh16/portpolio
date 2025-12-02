"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

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
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="parallax-layer" data-speed="0.3">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-balance mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Creative
              <br />
              <span className="text-accent">Developer</span>
            </h1>
          </div>

          <div className="parallax-layer" data-speed="0.5">
            <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Crafting beautiful digital experiences with code and creativity. Specializing in modern web development
              and interactive design.
            </p>
          </div>

          <div className="parallax-layer flex flex-wrap gap-4 justify-center pt-8" data-speed="0.7">
            <a
              href="#projects"
              className="px-10 py-5 bg-accent text-accent-foreground rounded-xl font-semibold text-base md:text-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-secondary text-secondary-foreground rounded-xl font-semibold text-base md:text-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          <div className="parallax-layer" data-speed="0.8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-muted-foreground">
              {["LLM Product Strategy", "Realtime Visualization", "High-Fidelity Motion", "Systems Thinking"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full border border-border/60 bg-background/80 backdrop-blur text-foreground/90 shadow-sm"
                  >
                    {item}
                  </span>
                ),
              )}
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
