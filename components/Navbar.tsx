"use client"

import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[24px] font-medium tracking-tight"
        >
          <span className="text-accent-blue">Sobat</span><span className="text-accent-orange">Ti</span>
        </Link>

        {/* Centered Nav */}
        <nav className="hidden items-center gap-1 md:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[14px] font-semibold text-foreground/50 px-4 py-2 rounded-full transition-all duration-200 hover:text-foreground hover:bg-cool-gray/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link href="#contact" className="btn btn-primary !py-3 !px-6 !text-[14px]">
          mulai sekarang
        </Link>
      </div>
    </motion.header>
  )
}
