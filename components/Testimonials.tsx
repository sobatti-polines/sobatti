"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import { useLenis } from "lenis/react"
import SectionLabel from "./SectionLabel"
import { useLenisPhysics } from "./SmoothScroll"
import { Star } from "lucide-react"

interface TestimonialItem {
  readonly index: string
  readonly tag: string
  readonly name: string
  readonly role: string
  readonly university: string
  readonly avatar: string
  readonly rating: number
  readonly text: string
}

const testimonials: readonly TestimonialItem[] = [
  {
    index: "01",
    tag: "Testimoni Pilihan · On-Site Mentoring",
    name: "Iqbal",
    role: "Siswa Jurusan TKJ",
    university: "SMK Muhammadiyah 2 Semarang",
    avatar: "IQ",
    rating: 5,
    text: "Mentornya ramah banget walaupun umur beda lumayan jauh tetapi tidak ada senioritas dan diajari hingga paham, sama beneran di datengi langsung di tempat",
  },
  {
    index: "02",
    tag: "Testimoni Pilihan · Data & Statistik",
    name: "Inas",
    role: "Mahasiswa Komputerisasi Akuntansi",
    university: "Politeknik Negeri Semarang",
    avatar: "IN",
    rating: 5,
    text: "Aku kira cuma di seputar web aja, di minta tolong buat tugas SPSS langsung bisa dan paham jadi nggak pusing lagi kalau ada matkul itu lagi",
  },
  {
    index: "03",
    tag: "Testimoni Pilihan · System & Troubleshooting",
    name: "Davin",
    role: "Mahasiswa Teknologi Rekayasa Komputer",
    university: "Politeknik Negeri Semarang",
    avatar: "DA",
    rating: 5,
    text: "Servicenya diluar cakupan wkwwk, install ulang windows 11 pun langsung bisa, lumayan nggak usah ke tukang service, sangat rekomended dan mas masnya sabar banget nunggin installasinya selesai",
  },
  {
    index: "04",
    tag: "Testimoni Pilihan · Proyek Akhir",
    name: "Adit",
    role: "Mahasiswa Teknik Informatika",
    university: "Politeknik Negeri Semarang",
    avatar: "AD",
    rating: 5,
    text: "Bingung mau buat proyek akhir yang unik, terus cari mentor yang bisa bantu aku sambil belajar skill baru. Mas firman bantu dari nol sampe jadi",
  },
]

function VoicePlane3D({
  item,
  index,
  total,
  progress,
  isHydrated,
}: {
  readonly item: TestimonialItem
  readonly index: number
  readonly total: number
  readonly progress: MotionValue<number>
  readonly isHydrated: boolean
}) {
  const step = 1 / total
  const start = index * step
  const pStart = index === 0 ? 0 : start + step * 0.14
  const pEnd = index === total - 1 ? 1 : (index + 1) * step - step * 0.14
  const end = (index + 1) * step

  // Long flat reading plateau between pStart and pEnd (72% of each step stays at z=0, rotate=0, opacity=1)
  const z = useTransform(
    progress,
    [start - step * 0.18, pStart, pEnd, end + step * 0.18],
    [index === 0 ? 0 : -340, 0, 0, index === total - 1 ? 0 : 280]
  )
  const opacity = useTransform(
    progress,
    [start - step * 0.12, pStart, pEnd, end + step * 0.12],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  )
  const rotateX = useTransform(
    progress,
    [start - step * 0.15, pStart, pEnd, end + step * 0.15],
    [index === 0 ? 0 : 16, 0, 0, index === total - 1 ? 0 : -14]
  )
  const y = useTransform(
    progress,
    [start - step * 0.15, pStart, pEnd, end + step * 0.15],
    [index === 0 ? 0 : 48, 0, 0, index === total - 1 ? 0 : -48]
  )

  return (
    <motion.div
      style={
        isHydrated
          ? {
              z,
              y,
              opacity,
              rotateX,
            }
          : {
              opacity: index === 0 ? 1 : 0,
            }
      }
      className="absolute inset-0 flex flex-col justify-center pointer-events-none preserve-3d"
    >
      <div className="max-w-[980px] w-full mx-auto pointer-events-auto preserve-3d">
        {/* Top spatial metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-[12px] font-bold tracking-[0.22em] text-accent-orange">
              /{item.index}
            </span>
            <span className="h-[1px] w-8 bg-accent-orange/50" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/65">
              {item.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[...Array(item.rating)].map((_, j) => (
              <Star
                key={j}
                className="w-4 h-4 fill-accent-orange text-accent-orange"
              />
            ))}
            <span className="font-mono text-[12px] font-bold text-white/85 ml-1.5">
              5.0
            </span>
          </div>
        </div>

        {/* Monumental Open-Air 3D Quote */}
        <blockquote
          style={{ transform: "translateZ(18px)" }}
          className="font-display text-[clamp(20px,2.4vw,32px)] font-bold leading-[1.38] tracking-[-0.02em] text-white"
        >
          &ldquo;{item.text}&rdquo;
        </blockquote>

        {/* Open-Canvas Author Attribution */}
        <div
          style={{ transform: "translateZ(12px)" }}
          className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-accent-orange text-white flex items-center justify-center font-mono text-[13px] font-bold">
              {item.avatar}
            </div>
            <div>
              <div className="font-display text-[18px] font-bold text-white leading-tight">
                {item.name}
              </div>
              <div className="font-sans text-[13.5px] text-white/65 mt-0.5">
                {item.role} · {item.university}
              </div>
            </div>
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            {item.university}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const lenis = useLenis()
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  })

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.min(
      testimonials.length - 1,
      Math.max(0, Math.floor(v * testimonials.length))
    )
    setActiveIndex(idx)
  })

  const scrollToVoice = (idx: number) => {
    setActiveIndex(idx)
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight
    const targetY =
      sectionTop + scrollable * ((idx + 0.5) / testimonials.length)
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.0 })
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
  }

  const bgQuoteRotateY = useTransform(smoothProgress, [0, 1], [-28, 28])
  const bgQuoteZ = useTransform(smoothProgress, [0, 0.5, 1], [-240, -140, -240])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative lg:h-[400vh] bg-dark-surface text-white overflow-x-clip"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between py-20 lg:pt-28 lg:pb-12 overflow-hidden scene-3d-deep">
        {/* Giant 3D Floating Quote Mark in Deep Space */}
        <motion.div
          aria-hidden="true"
          style={
            isHydrated
              ? {
                  rotateY: bgQuoteRotateY,
                  z: bgQuoteZ,
                }
              : undefined
          }
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden preserve-3d"
        >
          <span className="font-display text-[32vw] font-extrabold leading-none text-white/[0.03]">
            &ldquo;
          </span>
        </motion.div>

        {/* Top Header */}
        <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 relative z-10">
          <SectionLabel number="07" title="testimoni" dark className="mb-3" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white max-w-[620px]">
              Apa yang <span className="text-accent-orange">klien</span> katakan
              tentang kami
            </h2>

            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
              0{activeIndex + 1} / 0{testimonials.length} · SUARA SISWA &amp;
              MAHASISWA
            </div>
          </div>
        </div>

        {/* Desktop 3D Z-Space Quote Tunnel */}
        <motion.div
          style={isHydrated ? { rotateX: velocityRotateX } : undefined}
          className="hidden lg:block relative flex-1 mx-auto max-w-[1240px] w-full px-4 sm:px-6 preserve-3d"
        >
          {testimonials.map((item, i) => (
            <VoicePlane3D
              key={item.name}
              item={item}
              index={i}
              total={testimonials.length}
              progress={smoothProgress}
              isHydrated={isHydrated}
            />
          ))}
        </motion.div>

        {/* Desktop Open-Air 4-Voice Bottom Timeline */}
        <div className="hidden lg:block mx-auto max-w-[1240px] w-full px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-4 gap-8 pt-6 border-t border-white/12">
            {testimonials.map((t, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => scrollToVoice(i)}
                  className={`text-left cursor-pointer transition-opacity duration-300 focus:outline-none ${
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-accent-orange">
                      /{t.index}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 truncate">
                      {t.university}
                    </span>
                  </div>
                  <div className="font-display text-[17px] font-bold text-white">
                    {t.name}
                  </div>
                  <div className="font-sans text-[12px] text-white/55 truncate">
                    {t.role}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Open-Canvas Editorial Voices */}
        <div className="lg:hidden mx-auto max-w-[1240px] w-full px-4 sm:px-6 mt-10 divide-y divide-white/12">
          {testimonials.map((item) => (
            <div key={item.name} className="py-8 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent-orange">
                  /{item.index} · Testimoni Pilihan
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-accent-orange text-accent-orange"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="font-display text-[22px] sm:text-[26px] font-bold leading-[1.28] tracking-[-0.02em] text-white mb-5">
                &ldquo;{item.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-accent-orange text-white flex items-center justify-center font-mono text-[12px] font-bold shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-display text-[16px] font-bold text-white">
                    {item.name}
                  </div>
                  <div className="font-sans text-[12.5px] text-white/60">
                    {item.role} · {item.university}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
