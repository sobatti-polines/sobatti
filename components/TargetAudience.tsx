"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useLenis } from "lenis/react"
import SectionLabel from "./SectionLabel"
import { useLenisPhysics } from "./SmoothScroll"

const audiences = [
  {
    tag: "Pelajar",
    headline: "Pondasi teknis sejak dini",
    body: "Siswa sekolah menengah membutuhkan fondasi keterampilan IT yang kuat sebelum memasuki pendidikan tinggi atau dunia kerja. Kurikulum formal sering kali belum mencakup kompetensi teknis yang relevan dengan kebutuhan industri saat ini. Mentoring terstruktur membantu pelajar membangun pemahaman praktis sejak dini.",
    metric: "SMA/SMK",
    metricLabel: "tingkat pendidikan",
  },
  {
    tag: "Mahasiswa",
    headline: "Proyek Profesional & Portofolio",
    body: "Mahasiswa menghadapi tuntutan penyelesaian proyek akademik, tugas akhir, dan persiapan memasuki pasar kerja yang kompetitif. Bimbingan teknis yang terfokus membantu mereka menyelesaikan proyek dengan standar profesional dan membangun portofolio yang relevan untuk karier di sektor digital.",
    metric: "S1/D3",
    metricLabel: "tingkat pendidikan",
  },
]

export default function TargetAudience() {
  const sectionRef = useRef<HTMLElement>(null)
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

  // Long flat reading plateau for Stage 01 (0 -> 0.42), 3D flip (0.42 -> 0.58), long flat plateau for Stage 02 (0.58 -> 1)
  const p1RotateY = useTransform(smoothProgress, [0, 0.42, 0.56], [0, 0, -52])
  const p1Z = useTransform(smoothProgress, [0, 0.42, 0.56], [0, 10, -240])
  const p1Opacity = useTransform(smoothProgress, [0, 0.42, 0.54], [1, 1, 0])

  const p2RotateY = useTransform(smoothProgress, [0.44, 0.58, 1], [52, 0, 0])
  const p2Z = useTransform(smoothProgress, [0.44, 0.58, 1], [-240, 10, 0])
  const p2Opacity = useTransform(smoothProgress, [0.46, 0.58, 1], [0, 1, 1])

  const indicatorX = useTransform(smoothProgress, [0.4, 0.6], ["0%", "100%"])

  const scrollToStage = (stageIdx: 0 | 1) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight
    const targetY = sectionTop + scrollable * (stageIdx === 0 ? 0.15 : 0.82)
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.1 })
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
  }

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative lg:h-[320vh] bg-dark-surface text-white overflow-x-clip"
    >
      {/* Desktop 3D Spatial Folding Stage */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden scene-3d-deep">
        <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 h-full flex flex-col justify-between pt-28 pb-14 preserve-3d">
          {/* Top Header */}
          <div className="flex items-end justify-between gap-8">
            <div>
              <SectionLabel
                number="03"
                title="target audiens"
                dark
                className="mb-3"
              />
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                Siapa yang kami{" "}
                <span className="text-accent-orange">layani</span>
              </h2>
            </div>

            {/* Interactive Horizon Indicator */}
            <div className="flex items-center gap-6 pb-1">
              <button
                type="button"
                onClick={() => scrollToStage(0)}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-orange hover:text-white transition-colors cursor-pointer"
              >
                01 PELAJAR
              </button>
              <div className="w-28 h-px bg-white/15 relative">
                <motion.div
                  style={isHydrated ? { left: indicatorX } : { left: "0%" }}
                  className="absolute -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-orange"
                />
              </div>
              <button
                type="button"
                onClick={() => scrollToStage(1)}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-accent-orange transition-colors cursor-pointer"
              >
                02 MAHASISWA
              </button>
            </div>
          </div>

          {/* 3D Revolving Dual Stage */}
          <motion.div
            style={isHydrated ? { rotateX: velocityRotateX } : undefined}
            className="relative flex-1 flex items-center preserve-3d"
          >
            {/* 3D STAGE 01: PELAJAR (SMA/SMK) */}
            <motion.div
              style={
                isHydrated
                  ? {
                      rotateY: p1RotateY,
                      z: p1Z,
                      opacity: p1Opacity,
                      transformOrigin: "left center",
                    }
                  : undefined
              }
              className="absolute inset-x-0 grid grid-cols-12 gap-10 items-center preserve-3d pointer-events-none"
            >
              {/* Left Metric Column — Cleanly Contained */}
              <div className="col-span-5 pr-6 preserve-3d">
                <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange block mb-3">
                  /01 · {audiences[0].tag}
                </span>
                <div className="font-display text-[clamp(40px,4.6vw,64px)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white">
                  {audiences[0].metric}
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/45 mt-3">
                  {audiences[0].metricLabel}
                </div>
              </div>

              {/* Right Open Editorial Typography */}
              <div className="col-span-7 pl-10 border-l border-white/15 preserve-3d">
                <h3 className="font-display text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.12] tracking-[-0.025em] text-white mb-4">
                  {audiences[0].headline}
                </h3>
                <p className="font-body text-[16px] xl:text-[17.5px] leading-[1.72] text-white/80 max-w-[580px]">
                  {audiences[0].body}
                </p>
              </div>
            </motion.div>

            {/* 3D STAGE 02: MAHASISWA (S1/D3) */}
            <motion.div
              style={
                isHydrated
                  ? {
                      rotateY: p2RotateY,
                      z: p2Z,
                      opacity: p2Opacity,
                      transformOrigin: "right center",
                    }
                  : { opacity: 0 }
              }
              className="absolute inset-x-0 grid grid-cols-12 gap-10 items-center preserve-3d pointer-events-none"
            >
              {/* Left Metric Column — Cleanly Contained */}
              <div className="col-span-5 pr-6 preserve-3d">
                <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange block mb-3">
                  /02 · {audiences[1].tag}
                </span>
                <div className="font-display text-[clamp(40px,4.6vw,64px)] font-extrabold leading-[0.95] tracking-[-0.035em] text-accent-orange">
                  {audiences[1].metric}
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/45 mt-3">
                  {audiences[1].metricLabel}
                </div>
              </div>

              {/* Right Open Editorial Typography */}
              <div className="col-span-7 pl-10 border-l border-accent-orange/40 preserve-3d">
                <h3 className="font-display text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.12] tracking-[-0.025em] text-white mb-4">
                  {audiences[1].headline}
                </h3>
                <p className="font-body text-[16px] xl:text-[17.5px] leading-[1.72] text-white/80 max-w-[580px]">
                  {audiences[1].body}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="h-px w-full bg-white/10" />
        </div>
      </div>

      {/* Mobile / Tablet Open-Canvas Editorial Layout */}
      <div className="lg:hidden py-24 px-4 sm:px-6 mx-auto max-w-[760px]">
        <SectionLabel number="03" title="target audiens" dark />

        <h2 className="font-display text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white mb-12">
          Siapa yang kami <span className="text-accent-orange">layani</span>
        </h2>

        <div className="divide-y divide-white/15">
          {audiences.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="py-10 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-accent-orange">
                  /{item.tag}
                </span>
                <div className="text-right">
                  <span className="font-display text-[32px] sm:text-[40px] font-extrabold leading-none text-white">
                    {item.metric}
                  </span>
                  <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mt-1">
                    {item.metricLabel}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-[24px] sm:text-[30px] font-bold leading-[1.15] text-white mb-3">
                {item.headline}
              </h3>

              <p className="font-body text-[15.5px] sm:text-[17px] leading-[1.7] text-white/75">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
