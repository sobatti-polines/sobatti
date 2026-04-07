"use client"

import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#about", label: "tentang" },
  { href: "#audience", label: "audiens" },
  { href: "#services", label: "layanan" },
  { href: "#pricing", label: "harga" },
  { href: "#contact", label: "kontak" },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "")
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-[64px] md:h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[20px] sm:text-[24px] font-medium tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-accent-blue">Sobat</span><span className="text-accent-orange">Ti</span>
        </Link>

        {/* Centered Nav — desktop only */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "")
            const isActive = activeSection === id
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[14px] font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-accent-orange bg-cool-gray/60"
                    : "text-foreground/50 hover:text-foreground hover:bg-cool-gray/60"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link href="#contact" className="btn btn-primary !py-3 !px-6 !text-[14px] !hidden md:!inline-flex">
          mulai sekarang
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 rounded-full hover:bg-cool-gray/60 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-foreground/[0.06]"
      >
        <nav className="flex flex-col px-4 py-6 gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "")
            const isActive = activeSection === id
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[16px] font-semibold px-4 py-3 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-foreground bg-cool-gray/60"
                    : "text-foreground/70 hover:text-foreground hover:bg-cool-gray/60"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-4">
            <Link
              href="#contact"
              className="btn btn-primary w-full !py-3.5 !text-[15px]"
              onClick={() => setMobileOpen(false)}
            >
              mulai sekarang
            </Link>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  )
}
