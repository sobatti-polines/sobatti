"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"
import SectionLabel from "./SectionLabel"
import { useLenisPhysics } from "./SmoothScroll"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState(0)
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
    if (v < 0.33) setActiveStage(0)
    else if (v < 0.66) setActiveStage(1)
    else setActiveStage(2)
  })

  // 3D Orbital Sculpture rotations
  const globeRotateY = useTransform(smoothProgress, [0, 1], [-25, 165])
  const globeRotateX = useTransform(smoothProgress, [0, 1], [18, -22])

  // Act 1 3D Plane (0.00 -> 0.34, flat reading plateau 0.00 -> 0.27)
  const act1Z = useTransform(smoothProgress, [0, 0.27, 0.34], [0, 15, 260])
  const act1RotateX = useTransform(
    smoothProgress,
    [0, 0.27, 0.34],
    [0, 0, -14]
  )
  const act1Opacity = useTransform(smoothProgress, [0, 0.27, 0.34], [1, 1, 0])

  // Act 2 3D Plane (0.29 -> 0.68, flat reading plateau 0.36 -> 0.61)
  const act2Z = useTransform(
    smoothProgress,
    [0.29, 0.36, 0.61, 0.68],
    [-280, 0, 15, 260]
  )
  const act2RotateX = useTransform(
    smoothProgress,
    [0.29, 0.36, 0.61, 0.68],
    [16, 0, 0, -14]
  )
  const act2Opacity = useTransform(
    smoothProgress,
    [0.29, 0.36, 0.61, 0.68],
    [0, 1, 1, 0]
  )

  // Act 3 3D Plane (0.63 -> 1.00, flat reading plateau 0.70 -> 1.00)
  const act3Z = useTransform(
    smoothProgress,
    [0.63, 0.7, 1],
    [-280, 0, 20]
  )
  const act3RotateX = useTransform(
    smoothProgress,
    [0.63, 0.7, 1],
    [16, 0, 0]
  )
  const act3Opacity = useTransform(
    smoothProgress,
    [0.63, 0.7, 1],
    [0, 1, 1]
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative lg:h-[400vh] bg-dark-surface text-white overflow-x-clip"
    >
      {/* Desktop 3D Spatial Pinned Stage */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden scene-3d-deep">
        {/* 3D Revolving Wireframe Sphere in Background Z-Space */}
        <motion.div
          style={
            isHydrated
              ? {
                  rotateY: globeRotateY,
                  rotateX: globeRotateX,
                  z: -180,
                }
              : undefined
          }
          className="absolute w-[640px] h-[640px] rounded-full border border-white/[0.07] pointer-events-none preserve-3d flex items-center justify-center"
        >
          <div
            style={{ transform: "rotateY(60deg)" }}
            className="absolute inset-0 rounded-full border border-accent-blue/25"
          />
          <div
            style={{ transform: "rotateY(120deg)" }}
            className="absolute inset-0 rounded-full border border-accent-orange/20"
          />
          <div
            style={{ transform: "rotateX(75deg)" }}
            className="absolute inset-6 rounded-full border border-dashed border-white/15"
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 h-full flex flex-col justify-between pt-28 pb-14 preserve-3d">
          <div className="flex items-center justify-between gap-8">
            <SectionLabel
              number="01"
              title="tentang kami"
              dark
              className="mb-0"
            />
            <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.2em] uppercase">
              {["01 PENDAMPINGAN", "02 KORIDOR SEMARANG", "03 KOMITMEN"].map(
                (label, idx) => (
                  <span
                    key={label}
                    className={`transition-colors duration-300 ${
                      activeStage === idx
                        ? "text-accent-orange font-bold"
                        : "text-white/30"
                    }`}
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* 3D Depth Tunnel of Typography (With Long Flat Reading Plateaus!) */}
          <motion.div
            style={isHydrated ? { rotateX: velocityRotateX } : undefined}
            className="relative flex-1 flex items-center justify-center preserve-3d"
          >
            {/* PLANE 01: Headline + Paragraph 1 */}
            <motion.div
              style={
                isHydrated
                  ? {
                      z: act1Z,
                      rotateX: act1RotateX,
                      opacity: act1Opacity,
                    }
                  : undefined
              }
              className="absolute inset-x-0 grid grid-cols-12 gap-10 items-center preserve-3d pointer-events-none"
            >
              <div className="col-span-6 pr-4">
                <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange block mb-3">
                  /01 · PENDAMPINGAN TERSTRUKTUR
                </span>
                <h2 className="font-display text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
                  Platform bimbingan IT yang membantu Anda{" "}
                  <span className="text-accent-orange italic font-light">
                    Berkembang.
                  </span>
                </h2>
              </div>

              <div className="col-span-6 pl-8 border-l border-white/15">
                <p className="font-body text-[17px] xl:text-[19px] leading-[1.68] text-white/90">
                  SobatTi adalah bimbel IT di Semarang yang menyediakan layanan
                  bimbingan IT untuk bantu Anda meningkatkan keterampilan dan
                  menyelesaikan proyek. Setiap peserta mendapat pendampingan
                  terstruktur hingga proyek selesai.
                </p>
              </div>
            </motion.div>

            {/* PLANE 02: Semarang Academic Corridor */}
            <motion.div
              style={
                isHydrated
                  ? {
                      z: act2Z,
                      rotateX: act2RotateX,
                      opacity: act2Opacity,
                    }
                  : { opacity: 0 }
              }
              className="absolute inset-x-0 flex flex-col items-center text-center preserve-3d pointer-events-none"
            >
              <div className="flex flex-wrap items-center justify-center gap-5 mb-6 font-mono text-[11px] font-bold tracking-[0.26em] uppercase text-accent-orange">
                <span>TEMBALANG</span>
                <span className="text-white/30">·</span>
                <span>POLINES</span>
                <span className="text-white/30">·</span>
                <span>UNNES</span>
                <span className="text-white/30">·</span>
                <span>SEMARANG</span>
              </div>

              <p className="font-display text-[clamp(22px,2.8vw,36px)] font-bold leading-[1.35] tracking-[-0.02em] text-white max-w-[820px]">
                Melayani mahasiswa di{" "}
                <span className="text-accent-orange">Tembalang</span>, sekitar{" "}
                <span className="text-accent-orange">Polines</span>,{" "}
                <span className="text-accent-orange">Unnes</span>, dan seluruh{" "}
                <span className="text-accent-orange">Semarang</span>, kami
                menghubungkan peserta dengan mentor berpengalaman dalam
                lingkungan belajar yang suportif.
              </p>
            </motion.div>

            {/* PLANE 03: Final Mission Statement */}
            <motion.div
              style={
                isHydrated
                  ? {
                      z: act3Z,
                      rotateX: act3RotateX,
                      opacity: act3Opacity,
                    }
                  : { opacity: 0 }
              }
              className="absolute inset-x-0 flex flex-col items-start justify-center preserve-3d pointer-events-none"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-accent-orange mb-4">
                /03 · KOMITMEN UTAMA KAMI
              </span>
              <p className="font-display text-[clamp(28px,3.8vw,48px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white max-w-[880px]">
                Tujuan kami — bantu Anda menyelesaikan{" "}
                <span className="text-accent-orange">proyek digital</span>{" "}
                dengan percaya diri.
              </p>
            </motion.div>
          </motion.div>

          {/* Minimal Bottom Horizon Progress Line */}
          <div className="w-full flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
              0{activeStage + 1}
            </span>
            <div className="h-px flex-1 bg-white/15 relative overflow-hidden">
              <motion.div
                style={isHydrated ? { scaleX: smoothProgress } : undefined}
                className="absolute inset-0 bg-accent-orange origin-left"
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
              03
            </span>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Fluid Open-Canvas Editorial Layout */}
      <div className="lg:hidden py-24 px-4 sm:px-6 mx-auto max-w-[760px] space-y-14">
        <SectionLabel number="01" title="tentang kami" dark />

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(36px,8vw,56px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white"
        >
          Platform bimbingan IT yang membantu Anda{" "}
          <span className="text-accent-orange italic font-light">
            Berkembang.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[20px] sm:text-[24px] leading-[1.5] text-white/90"
        >
          SobatTi adalah bimbel IT di Semarang yang menyediakan layanan
          bimbingan IT untuk bantu Anda meningkatkan keterampilan dan
          menyelesaikan proyek. Setiap peserta mendapat pendampingan terstruktur
          hingga proyek selesai.
        </motion.p>

        <div className="h-px w-full bg-white/15" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-[17px] sm:text-[19px] leading-[1.7] text-white/75"
        >
          Melayani mahasiswa di Tembalang, sekitar Polines, Unnes, dan seluruh
          Semarang, kami menghubungkan peserta dengan mentor berpengalaman dalam
          lingkungan belajar yang suportif.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[28px] sm:text-[36px] font-extrabold leading-[1.1] tracking-[-0.025em] text-accent-orange pt-4"
        >
          Tujuan kami — bantu Anda menyelesaikan proyek digital dengan percaya
          diri.
        </motion.p>
      </div>
    </section>
  )
}
