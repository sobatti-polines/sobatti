"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLenis } from "lenis/react"
import { useLenisPhysics } from "./SmoothScroll"

const footerLinks = [
  {
    index: "01",
    heading: "layanan",
    links: [
      { label: "pengembangan web", href: "#services" },
      { label: "aplikasi mobile", href: "#services" },
      { label: "desain ui/ux", href: "#services" },
      { label: "penyuntingan video", href: "#services" },
      { label: "internet of things", href: "#services" },
    ],
  },
  {
    index: "02",
    heading: "perusahaan",
    links: [
      { label: "tentang kami", href: "#about" },
      { label: "layanan", href: "#services" },
      { label: "portofolio", href: "#portfolio" },
      { label: "harga", href: "#pricing" },
      { label: "hubungi kami", href: "#contact" },
    ],
  },
  {
    index: "03",
    heading: "sosial",
    links: [
      { label: "instagram", href: "https://instagram.com/sobat.ti" },
      { label: "tiktok", href: "https://tiktok.com/@sobat.ti" },
      { label: "whatsapp", href: "https://wa.me/6285327072575" },
    ],
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { isHydrated } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  })

  const wordmarkRotateX = useTransform(smoothProgress, [0, 1], [44, 0])
  const wordmarkZ = useTransform(smoothProgress, [0, 1], [-160, 0])
  const wordmarkOpacity = useTransform(smoothProgress, [0, 1], [0.2, 1])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="bg-dark-surface text-white pt-20 pb-12 md:pt-28 md:pb-14 border-t border-white/10 relative overflow-hidden scene-3d-deep"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 relative z-10">
        {/* Top Open-Air Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-10 mb-14 border-b border-white/12">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent-orange" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/55">
              SOBATTI · SEMARANG, INDONESIA
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-white/80 hover:text-accent-orange transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-accent-orange flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo_sobti.webp"
                alt="SobatTi Mentoring & Project Coaching"
                width={150}
                height={42}
                className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mt-6 font-body text-[15.5px] sm:text-[16.5px] leading-[1.7] text-white/65 max-w-[360px]">
              Bimbel IT di Semarang. Platform bimbingan IT dan mentoring proyek
              terlengkap dan terpercaya.
            </p>
            <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-accent-orange">
              Melayani area Tembalang, Polines, Unnes, dan sekitarnya
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div
              key={col.heading}
              className="lg:col-span-2 last:lg:col-span-3"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="font-mono text-[11px] font-bold text-accent-orange">
                  /{col.index}
                </span>
                <h4 className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-white/50">
                  {col.heading}
                </h4>
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http")
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(isExternal && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className="group inline-flex items-center gap-1.5 font-sans text-[14.5px] sm:text-[15.5px] font-medium text-white/70 transition-colors hover:text-white"
                      >
                        <span>{link.label}</span>
                        {isExternal && (
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/35 group-hover:text-accent-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* 3D Unfolding Monumental Wordmark */}
        <motion.div
          style={
            isHydrated
              ? {
                  rotateX: wordmarkRotateX,
                  z: wordmarkZ,
                  opacity: wordmarkOpacity,
                  transformOrigin: "bottom center",
                }
              : undefined
          }
          className="mt-16 pt-10 border-t border-white/12 select-none overflow-hidden preserve-3d"
        >
          <div className="font-display text-[clamp(40px,10vw,128px)] font-extrabold leading-[0.86] tracking-[-0.04em] text-white/[0.06] text-center uppercase">
            SOBATTI · SMG
          </div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-6 border-t border-white/10">
          <p className="font-mono text-[12px] tracking-[0.06em] text-white/45">
            © {new Date().getFullYear()} sobatti. hak cipta dilindungi.
          </p>
          <p className="font-mono text-[12px] tracking-[0.06em] text-white/45">
            bimbingan belajar &amp; mentoring proyek IT
          </p>
        </div>
      </div>
    </footer>
  )
}
