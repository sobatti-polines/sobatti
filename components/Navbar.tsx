"use client"

import Link from "next/link"
import Image from "next/image"
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useLenis } from "lenis/react"

const navLinks = [
  { href: "#about", label: "Tentang" },
  { href: "#audience", label: "Untuk Siapa" },
  { href: "#services", label: "Layanan" },
  { href: "#portfolio", label: "Portofolio" },
  { href: "#pricing", label: "Harga" },
  { href: "#contact", label: "Kontak" },
]

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const lenis = useLenis()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4
      let current = ""

      for (const link of navLinks) {
        const id = link.href.replace("#", "")
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    handleScrollSpy()
    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [])

  const scrollToTarget = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileOpen(false)
    if (href.startsWith("#")) {
      const target = document.querySelector(href) as HTMLElement | null
      if (target && lenis) {
        e.preventDefault()
        lenis.scrollTo(target, { duration: 1.35 })
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none"
    >
      <div
        className={`pointer-events-auto mx-auto max-w-[1240px] rounded-full transition-all duration-500 relative overflow-hidden ${
          scrolled
            ? "bg-dark-surface/90 backdrop-blur-xl border border-white/12 shadow-[0_20px_50px_-15px_rgba(10,11,13,0.5)]"
            : "bg-dark-surface/85 backdrop-blur-md border border-white/10"
        }`}
      >
        <div className="flex h-[58px] md:h-[64px] items-center justify-between px-3 sm:px-4 md:px-5">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              setMobileOpen(false)
              if (lenis) {
                e.preventDefault()
                lenis.scrollTo(0, { duration: 1.25 })
              }
            }}
            className="flex items-center px-2.5 py-1 rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
          >
            <Image
              src="/logo_sobti.webp"
              alt="SobatTi Mentoring & Project Coaching"
              width={126}
              height={34}
              className="h-6 sm:h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Center Nav */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const isActive = activeSection === id
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToTarget(e, link.href)}
                  className={`relative font-sans text-[13.5px] font-semibold px-4 py-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-white/12"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            onClick={(e) => scrollToTarget(e, "#contact")}
            className="hidden lg:inline-flex btn btn-orange !py-2.5 !px-5 !text-[13.5px] group"
          >
            <span>Mulai Sekarang</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Hairline Progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-orange origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto lg:hidden mt-2 mx-auto max-w-[1240px] rounded-[28px] bg-dark-surface/95 backdrop-blur-2xl border border-white/12 p-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "")
                const isActive = activeSection === id
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToTarget(e, link.href)}
                    className={`font-display text-[22px] font-bold px-4 py-3 rounded-2xl transition-colors ${
                      isActive
                        ? "text-accent-orange bg-white/[0.06]"
                        : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-5 pt-5 border-t border-white/10">
              <Link
                href="#contact"
                onClick={(e) => scrollToTarget(e, "#contact")}
                className="btn btn-orange w-full !py-3.5 !text-[15px]"
              >
                <span>Mulai Sekarang</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
