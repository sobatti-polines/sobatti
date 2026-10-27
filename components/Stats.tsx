"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useLenisPhysics } from "./SmoothScroll"

const stats = [
  { value: "50+", label: "materi" },
  { value: "1000+", label: "cakupan" },
  { value: "5", label: "bidang teknologi" },
  { value: "100%", label: "dedikasi mentor" },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  // 3D Spatial Ribbon Glide
  const ribbonX = useTransform(smoothProgress, [0, 1], ["10%", "-12%"])
  const ribbonRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-10, 0, 10])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-dark-surface text-white overflow-hidden scene-3d-deep"
    >
      {/* Top Hairline */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="h-px w-full bg-white/12 mb-16 md:mb-24" />
      </div>

      {/* Desktop 3D Kinetic Ribbon */}
      <div className="hidden lg:flex items-center justify-center scene-3d-deep">
        <motion.div
          style={
            isHydrated
              ? {
                  x: ribbonX,
                  rotateY: ribbonRotateY,
                  rotateX: velocityRotateX,
                }
              : undefined
          }
          className="flex items-end gap-14 xl:gap-24 preserve-3d whitespace-nowrap px-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                transform: `translateZ(${i % 2 === 0 ? "24px" : "-12px"})`,
              }}
              className="flex flex-col preserve-3d"
            >
              <span
                className={`font-display text-[clamp(44px,5.4vw,76px)] font-extrabold leading-[0.92] tracking-[-0.04em] tabular-nums ${
                  i % 2 === 1 ? "text-accent-orange" : "text-white"
                }`}
              >
                {stat.value}
              </span>
              <span className="mt-3 font-mono text-[12px] font-bold tracking-[0.2em] uppercase text-white/60">
                /0{i + 1} · {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile / Tablet Open Typographic Grid */}
      <div className="lg:hidden mx-auto max-w-[760px] px-4 sm:px-6 grid grid-cols-2 gap-y-12 gap-x-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div
              className={`font-display text-[clamp(48px,12vw,76px)] font-extrabold leading-[0.9] tracking-[-0.04em] tabular-nums ${
                i % 2 === 1 ? "text-accent-orange" : "text-white"
              }`}
            >
              {stat.value}
            </div>
            <div className="mt-2 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="h-px w-full bg-white/12 mt-16 md:mt-24" />
      </div>
    </section>
  )
}
