"use client"

import { useRef, useEffect, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import Image from "next/image"
import SectionLabel from "./SectionLabel"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useLenisPhysics } from "./SmoothScroll"

const portfolioItems = [
  {
    id: 1,
    client: "Anindha",
    origin: "Portofolio Website",
    image: "/images/9730A95D-FF46-4FD3-88BF-978C5F4967DA.jpg",
  },
  {
    id: 2,
    client: "Iqbal",
    origin: "Web Programming Basic",
    image: "/images/IMG-20260408-WA0210.jpg",
  },
  {
    id: 3,
    client: "Dinda",
    origin: "UIUX Basic",
    image: "/images/IMG-20260503-WA0010.jpeg",
  },
  {
    id: 4,
    client: "Stevan",
    origin: "Point of Sale System",
    image: "/images/IMG-20260513-WA0019.jpg",
  },
  {
    id: 5,
    client: "Khodir",
    origin: "Teaching Class",
    image: "/images/IMG-20260516-WA0029.jpg",
  },
  {
    id: 6,
    client: "Irma",
    origin: "Portofolio Website",
    image: "/images/IMG-20260522-WA0011.jpg",
  },
  {
    id: 7,
    client: "Akbar",
    origin: "Project Mentoring",
    image: "/images/IMG_20260423_171132_865.jpg",
  },
  {
    id: 8,
    client: "Davin",
    origin: "Portofolio Website",
    image: "/images/IMG_20260429_104851_510.jpg",
  },
  {
    id: 9,
    client: "Bagus",
    origin: "Mentoring Task",
    image: "/images/IMG_20260521_194211_319.jpg",
  },
]

const clientProjects = [
  {
    id: "jaggad-academy",
    client: "Jaggad Academy",
    industry: "E-Learning & Digital Products",
    description:
      "Platform edukasi digital modern untuk penjualan kelas online, kursus interaktif, dan produk digital seperti e-book. Dilengkapi integrasi payment gateway Midtrans (QRIS, VA, E-Wallet), Google OAuth login, member area & akses materi, serta dashboard CMS admin.",
    image: "/images/jaggad-academy-hero.webp",
    modules: [
      "Katalog Kelas & E-Book",
      "Payment Gateway (Midtrans)",
      "Google OAuth Login",
      "Member Area & Akses Materi",
      "CMS Admin & Manajemen Modul",
      "Meta Pixel & CAPI Tracking",
      "Manajemen Transaksi",
      "Laporan Penjualan",
    ],
    stack: ["Laravel 12", "React 18", "Inertia.js", "MySQL", "Midtrans"],
  },
  {
    id: "gekrafs-ticketing",
    client: "Gekrafs Ticketing",
    industry: "Event Management & Ticketing",
    description:
      "Sistem pemesanan dan ticketing event digital terintegrasi, mencakup landing page event, alur checkout pemesanan tiket online, generate e-ticket ber-QR code otomatis via email, hingga scanner QR absensi check-in peserta di venue event.",
    image: "/images/gekrafs-ticketing-hero.webp",
    modules: [
      "Landing Page Event",
      "Pemesanan & Checkout Tiket",
      "E-Ticket & QR Code Generator",
      "Pengiriman Tiket via Email",
      "QR Code Scanner Absensi",
      "Verifikasi Pembayaran",
      "Export Data Peserta ke Excel",
      "Sistem Referral & Komisi",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Supabase",
      "Tailwind CSS v4",
      "QR Scanner",
    ],
  },
  {
    id: "plk",
    client: "Putra Logam Kencana",
    industry: "Toko Bangunan",
    description:
      "Sistem ERP + CRM terintegrasi untuk mengelola operasional toko bangunan, mulai dari stok & pembelian hingga penjualan, piutang, dan relasi pelanggan dalam satu platform.",
    image: "/images/plk-hero.webp",
    modules: [
      "Manajemen Stok",
      "Pembelian & Supplier",
      "Penjualan & Faktur",
      "Piutang & Hutang",
      "Kas & Bank",
      "Data Pelanggan (CRM)",
      "Follow-up Sales",
      "Laporan Keuangan",
    ],
    stack: ["Next.js", "Prisma"],
    link: "https://putralogamkencana.web.id",
  },
  {
    id: "askonveksi",
    client: "AsKonveksi",
    industry: "Konveksi",
    description:
      "Sistem ERP + CRM untuk bisnis konveksi, mengelola order produksi, bahan baku, progres jahit, hingga relasi pelanggan dalam satu dashboard.",
    image: "/images/askonveksi-hero.webp",
    modules: [
      "Manajemen Order",
      "Produksi & Progres",
      "Stok Bahan Baku",
      "Data Pelanggan (CRM)",
      "Follow-up Sales",
      "Faktur & Pembayaran",
      "Laporan Penjualan",
    ],
    stack: ["Next.js", "Prisma"],
    link: "https://askonveksi.web.id",
  },
]

function ClientCase3D({
  project,
  index,
  isHydrated,
}: {
  readonly project: (typeof clientProjects)[number]
  readonly index: number
  readonly isHydrated: boolean
}) {
  const itemRef = useRef<HTMLElement>(null)
  const isEven = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
  })

  // 3D Perspective unfold with a wide flat reading plateau (0.28 -> 0.72 stays at 0deg)
  const imgRotateX = useTransform(
    smoothScroll,
    [0, 0.28, 0.72, 1],
    [18, 0, 0, -16]
  )
  const imgRotateY = useTransform(
    smoothScroll,
    [0, 0.28, 0.72, 1],
    isEven ? [-12, 0, 0, 10] : [12, 0, 0, -10]
  )
  const imgScale = useTransform(
    smoothScroll,
    [0, 0.28, 0.72, 1],
    [0.88, 1, 1, 0.92]
  )
  const titleY = useTransform(smoothScroll, [0, 1], [50, -50])

  return (
    <article
      ref={itemRef}
      className="py-16 md:py-28 border-t border-foreground/15 first:border-t-0 scene-3d-deep"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center preserve-3d">
        {/* 3D Floating Visual Plane */}
        <motion.div
          style={
            isHydrated
              ? {
                  rotateX: imgRotateX,
                  rotateY: imgRotateY,
                  scale: imgScale,
                }
              : undefined
          }
          className={`lg:col-span-7 relative preserve-3d ${
            !isEven ? "lg:order-2" : ""
          }`}
        >
          {/* Giant Floating Index Number at Z+40px */}
          <motion.span
            style={
              isHydrated
                ? { y: titleY, z: 40 }
                : undefined
            }
            className={`hidden md:block absolute -top-10 ${
              isEven ? "-left-4" : "-right-4"
            } z-20 font-display text-[56px] xl:text-[72px] font-extrabold leading-none tracking-[-0.04em] text-accent-orange select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(235,96,3,0.22)]`}
          >
            0{index + 1}
          </motion.span>

          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] shadow-[0_40px_90px_-20px_rgba(10,11,13,0.28)] group">
            {"link" in project && project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-full"
                title={`Buka ${project.client}`}
              >
                <Image
                  src={project.image}
                  alt={`Screenshot sistem ${project.client}`}
                  fill
                  className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </a>
            ) : (
              <Image
                src={project.image}
                alt={`Screenshot sistem ${project.client}`}
                fill
                className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            )}
          </div>
        </motion.div>

        {/* Open-Canvas Editorial Spec Column */}
        <div
          className={`lg:col-span-5 space-y-6 ${!isEven ? "lg:order-1" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-accent-orange">
              /{project.industry}
            </span>
          </div>

          <h3 className="font-display text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground">
            {project.client}
          </h3>

          <p className="font-body text-[15.5px] sm:text-[16.5px] leading-[1.7] text-foreground/75">
            {project.description}
          </p>

          {/* Bare Typographic Modules Stream */}
          <div className="pt-4 border-t border-foreground/12">
            <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-foreground/45 mb-3">
              modul sistem
            </div>
            <p className="font-sans text-[14.5px] leading-[1.8] text-foreground/85 font-medium">
              {project.modules.map((modul, mIdx) => (
                <span key={modul}>
                  {modul}
                  {mIdx < project.modules.length - 1 && (
                    <span className="text-accent-orange mx-2">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Stack + Live Action */}
          <div className="pt-4 border-t border-foreground/12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-accent-blue"
                >
                  #{tech}
                </span>
              ))}
            </div>

            {"link" in project && project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-[14px] font-bold text-accent-orange hover:text-accent-blue transition-colors group"
              >
                <span>Kunjungi Website Live</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const mentoringTrackRef = useRef<HTMLDivElement>(null)
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress: mentoringScroll } = useScroll({
    target: mentoringTrackRef,
    offset: ["start start", "end end"],
  })

  const smoothMentoringScroll = useSpring(mentoringScroll, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  const desktopX = useTransform(smoothMentoringScroll, [0, 1], ["4%", "-68%"])

  // Mobile / Manual scroll ref
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(sl > 0)
      setCanScrollRight(Math.ceil(sl + clientWidth) < scrollWidth - 5)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -520 : 520
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.8
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="portfolio" className="bg-paper-surface pt-24 md:pt-36">
      {/* ── Section Header ── */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 mb-14 md:mb-20">
        <SectionLabel number="05" title="Portofolio" dark={false} />

        <h2 className="font-display text-[clamp(32px,4.2vw,54px)] font-extrabold leading-[1.0] tracking-[-0.035em] text-foreground max-w-[780px]">
          Karya dan <span className="text-accent-blue">Hasil Mentoring</span>
        </h2>
      </div>

      {/* ── PART A: 3D Perspective Showcase (Project Klien) ── */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-24 md:pb-36">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[12px] font-bold tracking-[0.24em] uppercase text-accent-orange">
            /project klien
          </span>
          <div className="h-px flex-1 bg-foreground/15" />
        </div>

        <div>
          {clientProjects.map((project, index) => (
            <ClientCase3D
              key={project.id}
              project={project}
              index={index}
              isHydrated={isHydrated}
            />
          ))}
        </div>
      </div>

      {/* ── PART B: Pinned 3D Panoramic Filmstrip (Hasil Mentoring) ── */}
      <div
        ref={mentoringTrackRef}
        className="relative lg:h-[290vh] bg-dark-surface text-white"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pt-28 pb-12 overflow-hidden scene-3d-deep">
          <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6 mb-8">
            <div className="flex items-end justify-between gap-8">
              <div>
                <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange block mb-2">
                  /hasil mentoring
                </span>
                <h3 className="font-display text-[clamp(26px,3.4vw,42px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                  Eksplorasi &amp; Dokumentasi Sesi
                </h3>
              </div>

              {/* Mobile/Tablet Manual Controls */}
              <div className="flex lg:hidden items-center gap-3">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent-orange hover:border-accent-orange transition-all disabled:opacity-30"
                  aria-label="Proyek sebelumnya"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent-orange hover:border-accent-orange transition-all disabled:opacity-30"
                  aria-label="Proyek selanjutnya"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop 3D Curved Velocity Filmstrip */}
          <div className="hidden lg:flex items-center w-full overflow-visible scene-3d-deep">
            <motion.div
              style={
                isHydrated
                  ? {
                      x: desktopX,
                      rotateX: velocityRotateX,
                    }
                  : undefined
              }
              className="flex items-center gap-14 w-max pl-16 pr-32 preserve-3d"
            >
              {portfolioItems.map((item, idx) => {
                const tiltY = idx % 2 === 0 ? 8 : -8
                const depthZ = idx % 2 === 0 ? 30 : -20
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{
                      rotateY: 0,
                      z: 80,
                      scale: 1.04,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                    }}
                    style={
                      isHydrated
                        ? {
                            rotateY: tiltY,
                            z: depthZ,
                          }
                        : undefined
                    }
                    className="w-[400px] xl:w-[460px] shrink-0 group preserve-3d cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-[0_32px_70px_-20px_rgba(0,0,0,0.75)] mb-4">
                      <Image
                        src={item.image}
                        alt={item.client}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="460px"
                      />
                    </div>

                    <div
                      style={{ transform: "translateZ(20px)" }}
                      className="flex items-baseline justify-between gap-4 preserve-3d"
                    >
                      <h4 className="font-display text-[24px] xl:text-[28px] font-extrabold leading-none tracking-[-0.025em] text-white group-hover:text-accent-orange transition-colors">
                        {item.client}
                      </h4>
                      <p className="font-mono text-[11px] font-bold text-accent-orange uppercase tracking-[0.16em]">
                        {item.origin}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Mobile / Tablet Touch Carousel */}
          <div className="lg:hidden w-full relative">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-4 hide-scrollbar select-none ${
                isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
              }`}
            >
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-[84vw] sm:w-[460px] snap-center"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] mb-5">
                    <Image
                      src={item.image}
                      alt={item.client}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 84vw, 460px"
                      draggable={false}
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-display text-[30px] font-extrabold leading-none text-white">
                      {item.client}
                    </h4>
                    <p className="font-mono text-[11px] font-bold text-accent-orange uppercase tracking-[0.15em]">
                      {item.origin}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
