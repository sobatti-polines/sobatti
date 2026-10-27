"use client"

import Link from "next/link"
import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion"
import SectionLabel from "./SectionLabel"
import { useLenisPhysics } from "./SmoothScroll"
import { ArrowUpRight, MapPin, MessageCircle, Music2 } from "lucide-react"

function InstagramIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const contactChannels = [
  {
    index: "01",
    label: "Alamat",
    value: "Tembalang, Semarang",
    subvalue: "Jawa Tengah, Indonesia",
    href: null,
    icon: MapPin,
  },
  {
    index: "02",
    label: "WhatsApp",
    value: "+62 853-2707-2575",
    subvalue: "Respon Cepat · Konsultasi & Pendaftaran",
    href: "https://wa.me/6285327072575",
    icon: MessageCircle,
  },
  {
    index: "03",
    label: "Instagram",
    value: "@sobat.ti",
    subvalue: "Update Program & Dokumentasi Kelas",
    href: "https://instagram.com/sobat.ti",
    icon: InstagramIcon,
  },
  {
    index: "04",
    label: "TikTok",
    value: "@sobat.ti",
    subvalue: "Tips Coding & Keseruan Mentoring",
    href: "https://tiktok.com/@sobat.ti",
    icon: Music2,
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  })

  // Unfolds from 14deg into a flat 0deg reading plateau across the whole middle of the scroll
  const stageRotateX = useTransform(
    smoothProgress,
    [0, 0.32, 0.78, 1],
    [14, 0, 0, -6]
  )
  const stageZ = useTransform(
    smoothProgress,
    [0, 0.32, 0.78, 1],
    [-140, 0, 0, 30]
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 120,
    damping: 24,
  })
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 24,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-28 md:py-40 bg-paper-surface overflow-x-clip scene-3d-deep"
    >
      {/* Subtle 3D Floating Background Typography */}
      <motion.div
        aria-hidden="true"
        style={
          isHydrated
            ? {
                rotateX: stageRotateX,
                z: -220,
              }
            : undefined
        }
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden preserve-3d"
      >
        <span className="font-display text-[22vw] font-extrabold tracking-[-0.05em] text-accent-blue/[0.035] uppercase leading-none">
          CONNECT
        </span>
      </motion.div>

      <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6 relative z-10">
        <SectionLabel number="08" title="kontak" />

        <motion.div
          style={
            isHydrated
              ? {
                  rotateX: stageRotateX,
                  rotateY: tiltY,
                  z: stageZ,
                }
              : undefined
          }
          className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start preserve-3d"
        >
          {/* Left — Monumental Open-Air 3D Call to Action */}
          <motion.div
            style={isHydrated ? { rotateX: tiltX } : undefined}
            className="lg:col-span-6 flex flex-col justify-between preserve-3d"
          >
            <div style={{ transform: "translateZ(35px)" }}>
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-orange animate-pulse" />
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-accent-blue">
                  SEMARANG · ONLINE &amp; OFFLINE MENTORING
                </span>
              </div>

              <h2 className="font-display text-[clamp(34px,4.4vw,56px)] font-extrabold leading-[1.0] tracking-[-0.035em] text-foreground">
                Siap untuk{" "}
                <span className="text-accent-orange block sm:inline">
                  memulai?
                </span>
              </h2>

              <p className="mt-5 font-body text-[16px] sm:text-[17.5px] leading-[1.7] text-foreground/75 max-w-[460px]">
                Hubungi kami langsung melalui WhatsApp atau ikuti akun media
                sosial kami untuk informasi terbaru.
              </p>
            </div>

            <div
              style={{ transform: "translateZ(55px)" }}
              className="mt-10 pt-8 border-t border-foreground/15 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://wa.me/6285327072575"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-orange w-full sm:w-auto group"
              >
                <span>Hubungi via Whatsapp</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="https://instagram.com/sobat.ti"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full sm:w-auto"
              >
                Ikuti Instagram
              </Link>
            </div>
          </motion.div>

          {/* Right — Cardless 3D Architectural Contact Ledger */}
          <motion.div
            style={isHydrated ? { rotateX: velocityRotateX } : undefined}
            className="lg:col-span-6 preserve-3d"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-foreground">
              <h3 className="font-mono text-[12px] font-bold tracking-[0.22em] uppercase text-accent-blue">
                informasi kontak
              </h3>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-foreground/50">
                JAWA TENGAH · ID
              </span>
            </div>

            <div className="divide-y divide-foreground/12 preserve-3d">
              {contactChannels.map((ch) => {
                const Icon = ch.icon
                const rowContent = (
                  <motion.div
                    whileHover={{ x: 10, z: 24 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group py-6 sm:py-7 flex items-start sm:items-center justify-between gap-4 transition-colors preserve-3d"
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      <span className="font-mono text-[12px] font-bold text-accent-orange pt-1 sm:pt-0">
                        /{ch.index}
                      </span>

                      <div className="w-10 h-10 rounded-full border border-foreground/15 group-hover:border-accent-orange group-hover:bg-accent-orange group-hover:text-white flex items-center justify-center text-accent-blue transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/50">
                          {ch.label}
                        </div>
                        <div className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[-0.02em] text-foreground group-hover:text-accent-blue transition-colors leading-tight mt-0.5">
                          {ch.value}
                        </div>
                        <div className="font-sans text-[13.5px] text-foreground/65 mt-0.5">
                          {ch.subvalue}
                        </div>
                      </div>
                    </div>

                    {ch.href ? (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/40 group-hover:text-accent-orange transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-orange shrink-0">
                        LOKASI
                      </span>
                    )}
                  </motion.div>
                )

                if (ch.href) {
                  return (
                    <Link
                      key={ch.label}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {rowContent}
                    </Link>
                  )
                }

                return <div key={ch.label}>{rowContent}</div>
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
