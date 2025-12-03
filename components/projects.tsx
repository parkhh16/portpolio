"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollBoundText } from "@/hooks/use-scroll-bound-text"
import { projects } from "@/lib/projects"

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const fullTitle = "Featured Projects"
  const fullSubtitle = "문제 해결 중심으로 접근하며 설계·구현한 작업들을 소개합니다."

  const titleText = useScrollBoundText({ text: fullTitle, targetRef: sectionRef })
  const subtitleText = useScrollBoundText({ text: fullSubtitle, targetRef: sectionRef })

  const showTitleCursor = titleText.length > 0 && titleText.length < fullTitle.length
  const showSubtitleCursor = subtitleText.length > 0 && subtitleText.length < fullSubtitle.length

  const navigate = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev" ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, projects.length - 1)

    if (newIndex !== currentIndex) {
      goToSlide(newIndex)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const container = containerRef.current
    const card = cardRefs.current[currentIndex]
    if (!container || !card) return

    const cardLeft = card.offsetLeft
    const cardWidth = card.offsetWidth
    const containerWidth = container.clientWidth

    const targetScrollLeft = cardLeft - (containerWidth - cardWidth) / 2

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    })
  }, [currentIndex])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-fullscreen snap-section bg-background overflow-hidden flex items-center"
    >
      <div className="relative w-full mt-16 md:mt-20 lg:mt-24">
        <div className="w-full space-y-4 md:space-y-6">
          {/* Title Section */}
          <div className="text-center space-y-2 px-6">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold min-h-[2.5rem] tracking-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {titleText.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "Projects" ? (
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      {word}
                    </span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
              {showTitleCursor && <span className="animate-pulse">|</span>}
            </h2>
            <p className="text-2xl text-muted-foreground/90 max-w-3xl mx-auto min-h-[2.5rem] leading-relaxed">
              {subtitleText}
              {showSubtitleCursor && <span className="animate-pulse">|</span>}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative w-full md:max-w-5xl md:mx-auto md:px-4">
            {/* Navigation Buttons */}
            <button
              onClick={() => navigate("prev")}
              disabled={currentIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-card/80 backdrop-blur-xl text-foreground rounded-full hover:bg-primary hover:text-primary-foreground hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-card/80 transition-all duration-300 border border-border/50"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <button
              onClick={() => navigate("next")}
              disabled={currentIndex === projects.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-card/80 backdrop-blur-xl text-foreground rounded-full hover:bg-primary hover:text-primary-foreground hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-card/80 transition-all duration-300 border border-border/50"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Scrollable Cards Container */}
            <div
              ref={containerRef}
              className="overflow-x-auto overflow-y-visible scroll-smooth flex items-center"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className="flex items-center gap-6 md:gap-8 py-4 md:py-6"
                style={{
                  paddingLeft: "50vw",
                  paddingRight: "50vw",
                }}
              >
                {projects.map((project, index) => {
                  const isActive = index === currentIndex
                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        cardRefs.current[index] = el
                      }}
                      className="flex-shrink-0 transition-all duration-300 ease-out cursor-pointer"
                      style={{
                        width: "min(50vw, 480px)",
                      }}
                      onClick={() => {
                        if (isActive) {
                          router.push(`/projects/${project.slug}`)
                        } else {
                          goToSlide(index)
                        }
                      }}
                    >
                      <div className="py-3">
                        <Card
                          className={`transition-all duration-300 border bg-card h-full flex flex-col overflow-hidden ${
                            isActive
                              ? "border-primary/50 opacity-100 scale-100"
                              : "opacity-50 hover:opacity-75 scale-95 hover:scale-[0.97] border-border/50"
                          }`}
                        >
                          {/* Card Image */}
                          <div className="relative p-2 md:p-3">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted group">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                              />

                              <div
                                className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-background/90 via-background/30 to-transparent transition-opacity duration-500 ${
                                  isActive ? "opacity-80" : "opacity-0 group-hover:opacity-60"
                                }`}
                              />

                              {/* Action Buttons */}
                              {isActive && (
                                <div className="absolute bottom-3 right-3 flex gap-2 animate-in fade-in slide-in-from-bottom-6 duration-300">
                                  <a
                                    href={`/projects/${project.slug}`}
                                    className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label="View project"
                                  >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a
                                      href={project.github}
                                      className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label="View source code"
                                    >
                                      <Github className="w-4 h-4" />
                                    </a>
                                  </div>
                                )}
                            </div>
                          </div>

                          {/* Card Content - Only show when active */}
                          {isActive && (
                            <div className="p-3 md:p-4 mt-auto space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                              <h3 className="text-lg md:text-xl font-bold text-balance leading-tight">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed text-xs md:text-sm line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {project.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs bg-secondary/80 text-secondary-foreground rounded-full border border-border/50 backdrop-blur-sm hover:bg-secondary transition-colors animate-in fade-in duration-500"
                                    style={{
                                      animationDelay: `${tagIndex * 50}ms`,
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
