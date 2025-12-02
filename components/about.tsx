"use client"

import { useEffect, useRef, useState } from "react"

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
    <section id="about" ref={sectionRef} className="section-fullscreen snap-section bg-secondary/30 py-24 md:py-32 flex items-center">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Crafting Digital
                <br />
                <span className="text-accent">Experiences</span>
              </h2>
              <p className="text-xl text-muted-foreground/90 leading-relaxed">
                I&apos;m a passionate developer who loves creating beautiful, functional, and user-centered digital
                experiences. With expertise in modern web technologies, I bring ideas to life through clean code and
                thoughtful design.
              </p>
              <p className="text-xl text-muted-foreground/90 leading-relaxed">
                My approach combines technical excellence with creative problem solving, ensuring every project not only
                looks great but performs flawlessly.
              </p>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-accent/25 via-primary/10 to-background p-10 shadow-2xl shadow-accent/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center space-y-8">
                    <div className="space-y-2">
                      <div className="text-7xl font-bold text-accent">5+</div>
                      <div className="text-base text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-7xl font-bold text-accent">50+</div>
                      <div className="text-base text-muted-foreground">Projects Completed</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-7xl font-bold text-accent">30+</div>
                      <div className="text-base text-muted-foreground">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
