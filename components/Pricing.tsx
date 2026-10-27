"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"
import { useLenis } from "lenis/react"
import SectionLabel from "./SectionLabel"
import { Check, MessageCircle, ArrowUpRight } from "lucide-react"
import { useLenisPhysics } from "./SmoothScroll"

const WA_NUMBER = "6285327072575"

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

const schoolPackages = [
  {
    level: "sd",
    name: "Paket Les SD",
    price: "Rp200.000",
    period: "/8 pertemuan",
    subtitle: "Pengenalan Komputer & TIK",
    description:
      "Bimbingan les yang menyenangkan untuk anak SD — mengenal komputer, mengetik, hingga tugas sekolah lebih terbantu.",
    target: "Kelas 1–6 SD",
    features: [
      "8 pertemuan (1x seminggu)",
      "Mengenal komputer, mengetik, & Office dasar",
      "Bimbingan tugas sekolah",
      "Laporan perkembangan anak",
    ],
    cta: "Pesan Paket SD",
    highlighted: false,
  },
  {
    level: "smp",
    name: "Paket Les SMP",
    price: "Rp300.000",
    period: "/8 pertemuan",
    subtitle: "Dasar Pemrograman & TIK",
    description:
      "Paket terpopuler — membangun fondasi TIK dan pemrograman sederhana untuk siswa SMP sebelum naik jenjang.",
    target: "Kelas 7–9 SMP",
    features: [
      "8 pertemuan (1x seminggu)",
      "Dasar pemrograman (Scratch / Python ringan)",
      "Bimbingan tugas & proyek sekolah",
      "Laporan perkembangan siswa",
    ],
    cta: "Pesan Paket SMP",
    highlighted: true,
  },
  {
    level: "sma",
    name: "Paket Les SMA/SMK",
    price: "Rp400.000",
    period: "/8 pertemuan",
    subtitle: "Persiapan & Proyek Digital",
    description:
      "Untuk siswa SMA/SMK yang butuh penguatan TIK, bantuan tugas, atau pendampingan proyek kelas.",
    target: "Kelas 10–12 SMA/SMK",
    features: [
      "8 pertemuan (1x seminggu)",
      "Materi TIK sesuai kurikulum",
      "Bantuan proyek & tugas sekolah",
      "Laporan perkembangan siswa",
    ],
    cta: "Pesan Paket SMA",
    highlighted: false,
  },
]

const categories = [
  {
    id: "les",
    label: "Les & Konsultasi",
    items: [
      { name: "Les Private 60 menit", price: "Rp25.000" },
      { name: "Les Private 90 menit", price: "Rp35.000" },
      { name: "Konsultasi 60 menit", price: "Rp50.000" },
      { name: "Problem Solving kompleks", price: "Mulai Rp75.000" },
    ],
  },
  {
    id: "project",
    label: "Project",
    items: [
      { name: "Basic Project", price: "Mulai Rp300.000" },
      { name: "Intermediate Project", price: "Mulai Rp750.000" },
      { name: "Advanced Project", price: "Mulai Rp1.500.000" },
      { name: "Custom Project", price: "Mulai Rp3.000.000" },
    ],
  },
  {
    id: "website",
    label: "Website UMKM",
    items: [
      { name: "Landing Page UMKM", price: "Mulai Rp750.000" },
      { name: "Company Profile UMKM", price: "Mulai Rp1.500.000" },
      { name: "Catalog Website", price: "Mulai Rp2.000.000" },
      { name: "Web App", price: "Mulai Rp3.000.000" },
    ],
  },
  {
    id: "iot",
    label: "IoT",
    items: [
      { name: "IoT Basic", price: "Mulai Rp300.000" },
      { name: "IoT Intermediate", price: "Mulai Rp750.000" },
      { name: "IoT Advanced", price: "Mulai Rp2.000.000" },
    ],
  },
  {
    id: "uiux",
    label: "UI/UX",
    items: [
      { name: "UI/UX Basic", price: "Mulai Rp300.000" },
      { name: "UI/UX Intermediate", price: "Mulai Rp750.000" },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    items: [{ name: "Maintenance", price: "Mulai Rp150.000/bulan" }],
  },
]

function PriceRow({
  item,
  index,
}: {
  readonly item: { name: string; price: string }
  readonly index: number
}) {
  const [prefix, ...rest] = item.price.startsWith("Mulai ")
    ? ["Mulai ", item.price.slice(6)]
    : ["", item.price]

  return (
    <motion.li
      initial={{ opacity: 0, rotateX: -22, y: 16 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{
        duration: 0.42,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="preserve-3d"
    >
      <a
        href={waLink(
          `Halo SobatTi, saya mau tanya layanan "${item.name}" (${item.price}).`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-baseline justify-between gap-6 py-4 md:py-5 border-b border-white/15 transition-all duration-300 hover:pl-4"
      >
        <span className="font-display text-[17px] sm:text-[20px] font-bold text-white/85 group-hover:text-accent-orange transition-colors">
          {item.name}
        </span>

        <span className="flex items-baseline gap-3 shrink-0">
          <span className="font-display text-[18px] sm:text-[22px] font-extrabold text-white tabular-nums text-right">
            {prefix && (
              <span className="text-white/45 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider mr-2 font-normal">
                {prefix}
              </span>
            )}
            {rest.join("")}
          </span>
          <MessageCircle className="w-4 h-4 text-white/35 group-hover:text-accent-orange transition-transform duration-300 group-hover:scale-125 translate-y-[1px]" />
        </span>
      </a>
    </motion.li>
  )
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const ledgerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: ledgerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  })

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.min(
      categories.length - 1,
      Math.max(0, Math.floor(v * categories.length))
    )
    const nextId = categories[idx]?.id
    if (nextId) {
      setActiveCategory((prev) => (prev !== nextId ? nextId : prev))
    }
  })

  const handleCategorySelect = (catId: string, idx: number) => {
    setActiveCategory(catId)
    if (!ledgerRef.current || window.innerWidth < 1024) return
    const rect = ledgerRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const scrollable = ledgerRef.current.offsetHeight - window.innerHeight
    const targetY =
      sectionTop + scrollable * ((idx + 0.35) / categories.length)
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.9 })
    }
  }

  const current =
    categories.find((c) => c.id === activeCategory) ?? categories[0]

  return (
    <section
      id="pricing"
      className="bg-dark-surface text-white pt-24 md:pt-36 overflow-x-clip"
    >
      {/* ── PART 1: Open-Canvas Sculptural School Packages ── */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-24 md:pb-36 scene-3d-deep">
        <SectionLabel number="06" title="harga" dark />

        <h2 className="font-display text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white max-w-[760px] mb-14 md:mb-20">
          Investasi untuk{" "}
          <span className="text-accent-orange">Masa Depan</span> digital Anda
        </h2>

        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[12px] font-bold tracking-[0.24em] uppercase text-accent-orange">
            /paket les sekolah
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        {/* Borderless 3-Column Architectural Split with 3D Hover Elevation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/15 border-t border-b border-white/15 preserve-3d">
          {schoolPackages.map((plan, i) => (
            <motion.div
              key={plan.level}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ z: 36, y: -6 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`py-12 lg:py-14 ${
                i === 0
                  ? "lg:pr-10"
                  : i === 1
                    ? "lg:px-10"
                    : "lg:pl-10"
              } flex flex-col justify-between preserve-3d`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className={`font-mono text-[12px] font-bold tracking-[0.22em] uppercase ${
                      plan.highlighted ? "text-accent-orange" : "text-white/60"
                    }`}
                  >
                    /{plan.name}
                  </span>

                  {plan.highlighted && (
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-accent-orange border-b border-accent-orange pb-0.5">
                      paling populer
                    </span>
                  )}
                </div>

                <div className="font-sans text-[15px] font-semibold text-white/65 mb-6">
                  {plan.subtitle}
                </div>

                {/* Monumental Price Figure */}
                <div
                  style={{ transform: "translateZ(18px)" }}
                  className="mb-5 flex items-baseline gap-2 preserve-3d"
                >
                  <span
                    className={`font-display text-[clamp(30px,3.2vw,44px)] font-extrabold leading-none tracking-[-0.035em] tabular-nums ${
                      plan.highlighted ? "text-accent-orange" : "text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="font-mono text-[12px] text-white/45">
                    {plan.period}
                  </span>
                </div>

                <p className="font-body text-[15.5px] leading-[1.7] text-white/70 mb-3">
                  {plan.description}
                </p>

                <p className="font-mono text-[12px] text-white/45 mb-8">
                  Untuk: {plan.target}
                </p>

                <ul className="space-y-3.5 mb-10 border-t border-white/10 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          plan.highlighted
                            ? "text-accent-orange"
                            : "text-accent-blue"
                        }`}
                      />
                      <span className="font-sans text-[15px] font-medium text-white/85">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={waLink(
                  `Halo SobatTi, saya mau tanya ${plan.name} (${plan.price}${plan.period}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full ${
                  plan.highlighted
                    ? "btn-orange"
                    : "bg-transparent text-white border border-white/25 hover:bg-white hover:text-dark-surface"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PART 2: Pinned Borderless 3D Typographic Rate Ledger ── */}
      <div ref={ledgerRef} className="relative lg:h-[260vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pt-28 pb-12 overflow-hidden scene-3d-deep">
          <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange">
                /daftar harga lengkap
              </span>
              <div className="h-px flex-1 bg-white/15" />
            </div>

            <motion.div
              style={isHydrated ? { rotateX: velocityRotateX } : undefined}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start preserve-3d"
            >
              {/* Left — Bare Typographic Category Switcher */}
              <div className="lg:col-span-5">
                <h3 className="font-display text-[clamp(22px,2.8vw,34px)] font-bold leading-[1.1] tracking-[-0.025em] text-white mb-6">
                  Pilih layanan sesuai kebutuhan Anda
                </h3>

                <div
                  className="flex lg:flex-col gap-4 lg:gap-2.5 overflow-x-auto pb-3 lg:pb-0 hide-scrollbar"
                  role="tablist"
                  aria-label="Kategori layanan"
                >
                  {categories.map((cat, idx) => {
                    const isSelected = activeCategory === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleCategorySelect(cat.id, idx)}
                        className={`group flex items-baseline gap-3.5 text-left whitespace-nowrap transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                          isSelected
                            ? "lg:translate-x-2"
                            : "opacity-45 hover:opacity-85"
                        }`}
                      >
                        <span className="font-mono text-[11px] text-accent-orange font-bold">
                          /0{idx + 1}
                        </span>
                        <span
                          className={`font-display text-[19px] sm:text-[22px] font-extrabold tracking-[-0.02em] ${
                            isSelected ? "text-accent-orange" : "text-white"
                          }`}
                        >
                          {cat.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right — Frameless 3D Rate Lines */}
              <div className="lg:col-span-7 flex flex-col justify-between preserve-3d">
                <div className="border-t border-white/15 preserve-3d">
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={current.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="preserve-3d"
                    >
                      {current.items.map((item, i) => (
                        <PriceRow key={item.name} item={item} index={i} />
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>

                {/* Footnote + CTA */}
                <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <p className="font-body text-[13.5px] leading-[1.7] text-white/50 max-w-[460px]">
                    Harga bersifat mulai dari — disesuaikan dengan kompleksitas
                    &amp; ruang lingkup pekerjaan. Hosting, domain, komponen
                    hardware, dan transport tidak termasuk dalam harga di atas.
                  </p>
                  <Link
                    href={waLink(
                      "Halo SobatTi, saya mau minta penawaran untuk layanan yang tersedia."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-orange shrink-0"
                  >
                    <span>Minta Penawaran</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
