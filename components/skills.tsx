"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { useScrollBoundText } from "@/hooks/use-scroll-bound-text"

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Figma", "VS Code", "Vercel"],
  },
  {
    category: "Design",
    items: ["UI/UX", "Animation", "Responsive", "Accessibility", "Prototyping"],
  },
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const fullTitle = "Skills & Expertise"
  const fullSubtitle = "A comprehensive toolkit for building modern web applications"

  const titleText = useScrollBoundText({ text: fullTitle, targetRef: sectionRef })
  const subtitleText = useScrollBoundText({ text: fullSubtitle, targetRef: sectionRef })

  const showTitleCursor = titleText.length > 0 && titleText.length < fullTitle.length
  const showSubtitleCursor = subtitleText.length > 0 && subtitleText.length < fullSubtitle.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section-fullscreen snap-section bg-secondary/30 py-24 md:py-32 flex items-center">
      <div className="container mx-auto px-10">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold min-h-[4.5rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {titleText.split(" ").map((word, i) => (
                <span key={i}>{word === "Expertise" ? <span className="text-accent">{word}</span> : word} </span>
              ))}
              {showTitleCursor && <span className="animate-pulse">|</span>}
            </h2>
            <p className="text-2xl text-muted-foreground/90 max-w-3xl mx-auto min-h-[2.5rem]">
              {subtitleText}
              {showSubtitleCursor && <span className="animate-pulse">|</span>}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillSet, index) => (
              <Card
                key={skillSet.category}
                className={`p-8 md:p-9 space-y-6 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-3 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-accent">{skillSet.category}</h3>
                <ul className="space-y-3.5">
                  {skillSet.items.map((item) => (
                    <li
                      key={item}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
