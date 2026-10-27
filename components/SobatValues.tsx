"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import { useLenis } from "lenis/react"
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"
import SectionLabel from "./SectionLabel"
import { useLenisPhysics } from "./SmoothScroll"

const values = [
  {
    index: "01",
    letter: "S",
    word: "Solutif",
    description:
      "Mampu memecahkan masalah. Tidak sekadar menghafal teori, tapi menggunakan teknologi (kode, alat, atau desain) sebagai solusi yang nyata.",
  },
  {
    index: "02",
    letter: "O",
    word: "Optimis",
    description:
      "Membangun lingkungan belajar yang positif, di mana hal rumit seperti mikrokontroler atau framework web bisa dipelajari oleh siapa saja.",
  },
  {
    index: "03",
    letter: "B",
    word: "Bersahabat",
    description:
      "Lingkungan belajar yang hangat, suportif, dan kolaboratif. Kami membangun hubungan yang nyaman antara mentor dan peserta agar proses belajar terasa menyenangkan dan efektif.",
  },
  {
    index: "04",
    letter: "A",
    word: "Adaptif",
    description:
      "Fleksibel dan selalu update dengan teknologi terbaru, baik itu tren desain antarmuka masa kini maupun perkembangan perangkat keras.",
  },
  {
    index: "05",
    letter: "T",
    word: "Terampil",
    description:
      "Hasil nyata yang terukur dalam keterampilan teknis. Setiap sesi dirancang untuk menghasilkan kompetensi yang bisa langsung diaplikasikan dalam proyek dan dunia kerja.",
  },
]

const ANGLE_STEP = 56 // degrees between each value on the 3D drum
const RADIUS_Y = 235 // vertical 3D orbit radius (prevents any overlap!)
const RADIUS_Z = 220 // depth 3D orbit radius

function CylinderSpoke({
  value,
  index,
  wheelRotation,
  isHydrated,
}: {
  readonly value: (typeof values)[number]
  readonly index: number
  readonly wheelRotation: MotionValue<number>
  readonly isHydrated: boolean
}) {
  const targetAngle = index * ANGLE_STEP

  // Relative angle in degrees: 0 when this spoke is front-and-center
  const relativeAngle = useTransform(wheelRotation, (r) => r - targetAngle)

  // True trigonometric 3D cylinder coordinates so spokes orbit cleanly above/below and NEVER overlap
  const y = useTransform(relativeAngle, (deg) => {
    const rad = (deg * Math.PI) / 180
    return -Math.sin(rad) * RADIUS_Y
  })

  const z = useTransform(relativeAngle, (deg) => {
    const rad = (deg * Math.PI) / 180
    return (Math.cos(rad) - 1) * RADIUS_Z
  })

  const rotateX = useTransform(relativeAngle, (deg) => deg * 0.42)

  const opacity = useTransform(
    relativeAngle,
    [-85, -56, -12, 0, 12, 56, 85],
    [0, 0.2, 1, 1, 1, 0.2, 0]
  )

  const scale = useTransform(
    relativeAngle,
    [-65, -10, 0, 10, 65],
    [0.86, 1, 1, 1, 0.86]
  )

  return (
    <motion.div
      style={
        isHydrated
          ? {
              y,
              z,
              rotateX,
              opacity,
              scale,
            }
          : {
              opacity: index === 0 ? 1 : 0,
            }
      }
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 preserve-3d backface-hidden pointer-events-none"
    >
      <div className="pb-6 border-b border-foreground/15">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-accent-orange">
            /{value.index} · PRINSIP S.O.B.A.T
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="font-display text-[clamp(36px,4.2vw,54px)] font-extrabold leading-[0.9] tracking-[-0.035em] text-accent-orange">
              {value.letter}.
            </span>
            <span className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold leading-none tracking-[-0.025em] text-accent-blue">
              {value.word}
            </span>
          </div>

          <p className="font-body text-[15.5px] xl:text-[17px] leading-[1.68] text-foreground/85 max-w-[560px]">
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function SobatValues() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRotateRef = useRef<TextRotateRef>(null)
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

  // Stepped 3D cylinder rotation with long reading plateaus at each of the 5 S.O.B.A.T stops
  const wheelRotation = useTransform(
    smoothProgress,
    [0, 0.14, 0.22, 0.36, 0.44, 0.58, 0.66, 0.8, 0.88, 1],
    [
      0,
      0,
      ANGLE_STEP,
      ANGLE_STEP,
      ANGLE_STEP * 2,
      ANGLE_STEP * 2,
      ANGLE_STEP * 3,
      ANGLE_STEP * 3,
      ANGLE_STEP * 4,
      ANGLE_STEP * 4,
    ]
  )

  const giantLetterRotateY = useTransform(smoothProgress, [0, 1], [-32, 32])

  useMotionValueEvent(wheelRotation, "change", (deg) => {
    const idx = Math.min(
      values.length - 1,
      Math.max(0, Math.round(deg / ANGLE_STEP))
    )
    setActiveIndex((prev) => (prev !== idx ? idx : prev))
  })

  // Safely sync TextRotate inside useEffect (never during render!)
  useEffect(() => {
    textRotateRef.current?.jumpTo(activeIndex)
  }, [activeIndex])

  const scrollToValue = (idx: number) => {
    setActiveIndex(idx)
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight
    const targetStops = [0.06, 0.29, 0.51, 0.73, 0.94]
    const targetY =
      sectionTop + scrollableDistance * (targetStops[idx] ?? idx / 4)

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.1 })
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
  }

  const activeValue = values[activeIndex] ?? values[0]

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative lg:h-[460vh] bg-paper-surface overflow-x-clip"
    >
      {/* Desktop 3D Revolving Cylinder Stage */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden scene-3d-deep">
        {/* Giant 3D Sculptural Background Letter in Deep Z-Space */}
        <motion.div
          aria-hidden="true"
          style={
            isHydrated
              ? {
                  rotateY: giantLetterRotateY,
                  z: -240,
                }
              : undefined
          }
          className="absolute right-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none preserve-3d"
        >
          <span className="font-display text-[36vw] font-extrabold leading-none tracking-[-0.06em] text-accent-blue/[0.04] block">
            {activeValue.letter}
          </span>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 h-full flex flex-col justify-between pt-28 pb-14 preserve-3d">
          <div className="flex items-center justify-between">
            <SectionLabel number="02" title="S.O.B.A.T" className="mb-0" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/45">
              0{activeIndex + 1} / 05 · {activeValue.word}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-12 items-center flex-1 preserve-3d">
            {/* Left — Editorial Title & Interactive 3D Acronym Axis */}
            <motion.div
              style={isHydrated ? { rotateX: velocityRotateX } : undefined}
              className="col-span-5 preserve-3d"
            >
              <h2 className="font-display text-[clamp(32px,3.8vw,52px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground">
                Mengapa <span className="text-accent-blue">Kita</span>
                <br />
                <TextRotate
                  ref={textRotateRef}
                  texts={values.map((v) => v.word)}
                  mainClassName="text-accent-orange"
                  splitLevelClassName="overflow-hidden pb-2"
                  staggerFrom="first"
                  animatePresenceMode="wait"
                  loop={false}
                  auto={false}
                  staggerDuration={0.02}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              </h2>

              {/* Interactive S.O.B.A.T Axis */}
              <div className="mt-12 flex items-baseline gap-5">
                {values.map((v, i) => {
                  const isActive = i === activeIndex
                  return (
                    <button
                      key={v.letter}
                      type="button"
                      onClick={() => scrollToValue(i)}
                      className={`font-display cursor-pointer transition-all duration-300 focus:outline-none ${
                        isActive
                          ? "text-[38px] font-extrabold text-accent-orange -translate-y-1 border-b-2 border-accent-orange pb-1"
                          : "text-[24px] font-bold text-foreground/30 hover:text-foreground/70"
                      }`}
                    >
                      {v.letter}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Right — True Trigonometric 3D Revolving Cylinder Drum (Zero Overlap!) */}
            <div className="col-span-7 relative h-[480px] flex items-center scene-3d-deep">
              <div className="relative w-full h-full preserve-3d">
                {values.map((value, i) => (
                  <CylinderSpoke
                    key={value.letter}
                    value={value}
                    index={i}
                    wheelRotation={wheelRotation}
                    isHydrated={isHydrated}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/45">
              S
            </span>
            <div className="h-px flex-1 bg-foreground/12 relative overflow-hidden">
              <motion.div
                style={isHydrated ? { scaleX: smoothProgress } : undefined}
                className="absolute inset-0 bg-accent-orange origin-left"
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/45">
              T
            </span>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Open-Canvas Typographic Stream */}
      <div className="lg:hidden py-24 px-4 sm:px-6 mx-auto max-w-[760px]">
        <SectionLabel number="02" title="S.O.B.A.T" />

        <h2 className="font-display text-[clamp(36px,8vw,56px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-foreground mb-12">
          Mengapa <span className="text-accent-blue">Kita</span>{" "}
          <span className="text-accent-orange">S.O.B.A.T</span>
        </h2>

        <div className="divide-y divide-foreground/15">
          {values.map((value, i) => (
            <motion.div
              key={value.letter}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="py-8 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-[48px] sm:text-[60px] font-extrabold leading-none text-accent-orange">
                  {value.letter}.
                </span>
                <span className="font-display text-[26px] sm:text-[32px] font-bold leading-none text-accent-blue">
                  {value.word}
                </span>
              </div>
              <p className="font-body text-[16px] sm:text-[17.5px] leading-[1.7] text-foreground/75">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
