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

const services = [
  {
    title: "Web Development",
    description:
      "Pelajari pengembangan web modern dari front-end hingga back-end. Bangun aplikasi web yang fungsional, responsif, dan siap produksi.",
    tags: ["React", "Next.js", "Node"],
  },
  {
    title: "Mobile Development",
    description:
      "Kuasai pengembangan aplikasi mobile untuk iOS dan Android. Rilis aplikasi yang stabil, mudah digunakan, dan sesuai standar industri.",
    tags: ["Flutter", "React Native", "Swift"],
  },
  {
    title: "UI/UX Design",
    description:
      "Pelajari prinsip desain antarmuka dan pengalaman pengguna yang efektif. Ciptakan desain yang intuitif dan berorientasi pengguna.",
    tags: ["Figma", "Prototyping", "Riset"],
  },
  {
    title: "Internet of Things",
    description:
      "Pelajari pengembangan IoT dari perangkat keras hingga integrasi sistem. Bangun solusi IoT yang fungsional dan terukur.",
    tags: ["Arduino", "ESP32", "MQTT"],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { isHydrated, velocityRotateX } = useLenisPhysics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  })

  // 3D Isometric Sculpture rotation driven by scroll
  const isoRotateZ = useTransform(smoothProgress, [0, 1], [-36, -20])
  const isoRotateX = useTransform(smoothProgress, [0, 1], [58, 50])

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.min(
      services.length - 1,
      Math.max(0, Math.floor(v * services.length))
    )
    setActiveIndex(idx)
  })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative lg:h-[360vh] bg-paper-surface overflow-x-clip"
    >
      {/* Desktop Pinned 3D Stage */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden scene-3d-deep">
        <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 h-full flex flex-col justify-between pt-24 pb-10 preserve-3d">
          <div className="flex items-end justify-between gap-8">
            <div>
              <SectionLabel number="04" title="layanan" className="mb-2" />
              <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground">
                Layanan pembelajaran{" "}
                <span className="text-accent-orange">Kami</span>
              </h2>
            </div>

            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/45 pb-1">
              0{activeIndex + 1} / 0{services.length} ·{" "}
              {services[activeIndex]?.title}
            </div>
          </div>

          <motion.div
            style={isHydrated ? { rotateX: velocityRotateX } : undefined}
            className="grid grid-cols-12 gap-12 items-center flex-1 preserve-3d"
          >
            {/* Left — Open-Canvas Borderless Typographic List (All 4 Always Readable!) */}
            <div className="col-span-7 divide-y divide-foreground/12">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                return (
                  <div
                    key={service.title}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className={`relative py-4 cursor-pointer group transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
                    }`}
                  >
                    {/* Active Left Bar */}
                    <div
                      className={`absolute -left-5 top-4 bottom-4 w-[3px] transition-all duration-300 ${
                        isActive
                          ? "bg-accent-orange scale-y-100"
                          : "bg-transparent scale-y-0"
                      }`}
                    />

                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                            isActive
                              ? "text-accent-orange"
                              : "text-foreground/40"
                          }`}
                        >
                          /0{i + 1}
                        </span>
                        <h3
                          className={`font-display transition-all duration-300 tracking-[-0.025em] leading-none ${
                            isActive
                              ? "text-[clamp(22px,2.4vw,30px)] font-extrabold text-accent-blue translate-x-1"
                              : "text-[19px] font-bold text-foreground/70 group-hover:text-accent-blue"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Minimal Inline Tags */}
                      <div className="flex items-center gap-3">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                              isActive
                                ? "text-accent-orange font-bold"
                                : "text-foreground/45"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="pt-2 pl-10 font-body text-[14.5px] xl:text-[15.5px] leading-[1.6] text-foreground/80 max-w-[540px]">
                      {service.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Right — True 3D Exploding Isometric Layer Sculpture */}
            <div className="col-span-5 flex items-center justify-center h-[420px] scene-3d-deep">
              <motion.div
                style={
                  isHydrated
                    ? {
                        rotateX: isoRotateX,
                        rotateZ: isoRotateZ,
                      }
                    : undefined
                }
                className="relative w-[270px] h-[270px] preserve-3d"
              >
                {services.map((service, i) => {
                  const isActive = i === activeIndex
                  const zOffset = (services.length - 1 - i) * 68
                  return (
                    <motion.div
                      key={service.title}
                      animate={{
                        z: isActive ? zOffset + 28 : zOffset,
                        scale: isActive ? 1.08 : 0.94,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                      }}
                      onClick={() => setActiveIndex(i)}
                      className={`absolute inset-0 rounded-[28px] border-2 p-6 flex flex-col justify-between cursor-pointer preserve-3d transition-colors duration-500 ${
                        isActive
                          ? "bg-dark-surface/95 border-accent-orange text-white shadow-[0_40px_80px_rgba(10,11,13,0.45)]"
                          : "bg-accent-blue/[0.06] border-accent-blue/25 text-foreground/45"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.2em]">
                        <span>0{i + 1}</span>
                        <span>{service.tags[0]}</span>
                      </div>

                      <div>
                        <div className="font-display text-[22px] font-extrabold leading-tight">
                          {service.title}
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1 opacity-75">
                          {service.tags.join(" · ")}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/45">
              01
            </span>
            <div className="h-px flex-1 bg-foreground/12 relative overflow-hidden">
              <motion.div
                style={isHydrated ? { scaleX: smoothProgress } : undefined}
                className="absolute inset-0 bg-accent-orange origin-left"
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/45">
              04
            </span>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Open-Canvas Editorial Layout */}
      <div className="lg:hidden py-24 px-4 sm:px-6 mx-auto max-w-[760px]">
        <SectionLabel number="04" title="layanan" />

        <h2 className="font-display text-[clamp(36px,8vw,56px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-foreground mb-12">
          Layanan pembelajaran{" "}
          <span className="text-accent-orange">Kami</span>
        </h2>

        <div className="divide-y divide-foreground/15">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="py-9 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[13px] font-bold text-accent-orange">
                  /0{i + 1}
                </span>
                <h3 className="font-display text-[28px] sm:text-[34px] font-extrabold leading-tight text-accent-blue">
                  {service.title}
                </h3>
              </div>

              <p className="font-body text-[16px] sm:text-[17.5px] leading-[1.7] text-foreground/75 mb-4">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-accent-orange"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
