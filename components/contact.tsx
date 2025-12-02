"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="relative section-fullscreen snap-section bg-background py-12 md:py-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--accent-rgb),0.1),transparent_50%)]" />

      <div className="relative w-full px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-[1600px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-block">
              <div className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-medium mb-2">
                Get In Touch
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Let's <span className="text-accent">Connect</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4 border-border/50 hover:border-accent/40 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-accent/10 group">
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300">
                  Send a Message
                </h3>
                <p className="text-sm text-muted-foreground">Fill out the form below and I'll get back to you soon.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border/50 focus:border-accent text-sm py-2 bg-background/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-border/50 focus:border-accent text-sm py-2 bg-background/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-border/50 focus:border-accent min-h-20 text-sm bg-background/50 resize-none transition-all duration-300"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 py-3 text-base font-semibold group/btn transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50"
                  disabled={isSubmitting || submitted}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">✓</span> Message Sent!
                    </span>
                  ) : isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⟳</span> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </Button>
              </form>
            </Card>

            <div className="grid grid-cols-2 gap-3 auto-rows-min">
              <Card className="col-span-2 p-5 border-border/50 hover:border-accent/40 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-accent/10 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <a
                      href="mailto:hello@example.com"
                      className="text-base md:text-lg font-semibold hover:text-accent transition-colors duration-300"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border/50 hover:border-accent/40 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-accent/10 group">
                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 self-start">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-semibold">Seoul, Korea</div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border/50 hover:border-accent/40 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-accent/10 group">
                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 self-start">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground">Response</div>
                    <div className="text-sm font-semibold">Within 24h</div>
                  </div>
                </div>
              </Card>

              <Card className="col-span-2 p-5 border-border/50 bg-background/50 backdrop-blur-sm">
                <div className="space-y-3">
                  <h3 className="text-base font-bold">Follow Me</h3>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="p-3 bg-secondary/50 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:-rotate-6 border border-border/50 hover:border-accent/50"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-secondary/50 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:rotate-6 border border-border/50 hover:border-accent/50"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-secondary/50 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:-rotate-6 border border-border/50 hover:border-accent/50"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="col-span-2 p-5 bg-gradient-to-br from-accent/20 via-accent/10 to-primary/10 border-accent/30 rounded-xl relative overflow-hidden group hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative space-y-2">
                  <div className="inline-block px-2.5 py-0.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-medium">
                    Available Now
                  </div>
                  <div className="text-lg md:text-xl font-bold leading-tight">Open for freelance projects</div>
                  <p className="text-muted-foreground text-xs">Let's build something amazing together</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="w-full px-6 md:px-12 text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2025 Portfolio. Crafted with passion and code.</p>
        </div>
      </footer>
    </section>
  )
}
