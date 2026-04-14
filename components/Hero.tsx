"use client";

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const words = ["Web", "Video", "UI/UX", "IoT", "Mobile"]

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block relative text-accent-orange"
      style={{ minWidth: "4.5ch" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const icons = [
  { icon: "devicon-javascript-plain", x: "12%", y: "18%", delay: 0 },
  { icon: "devicon-androidstudio-plain", x: "88%", y: "25%", delay: 0.1 },
  { icon: "devicon-arduino-plain", x: "8%", y: "72%", delay: 0.2 },
  { icon: "devicon-premierepro-plain", x: "92%", y: "65%", delay: 0.1 },
  { icon: "devicon-canva-original", x: "20%", y: "45%", delay: 0.15 },
  { icon: "devicon-figma-plain", x: "83%", y: "50%", delay: 0.25 },
]

function FloatingIcon({ icon, x, y, delay }: { icon: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute pointer-events-none text-accent-blue/25`}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0, 10, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
      >
        <i className={`${icon} text-4xl md:text-5xl lg:text-6xl`} />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Floating icons */}
      {icons.map((item, index) => (
        <FloatingIcon key={index} {...item} />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent circle — far background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-accent-blue/[0.06] pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border border-accent-blue/[0.04] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
        <div className="max-w-[860px] mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8"
          >
            <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.25em] uppercase text-accent-orange bg-accent-orange/[0.06] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              bimbingan IT & mentoring proyek
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(32px,8vw,80px)] font-normal leading-[1.00] tracking-[-0.02em] text-foreground"
          >
            Kuasai <RotatingWord />
            <br />
            dengan bimbingan{" "}
            <span className="relative">
              <span className="relative z-10 text-accent-orange">Ahli</span>
              <span className="absolute inset-0 bg-accent-orange/30 -rotate-2 scale-y-110 scale-x-120" />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 mx-auto max-w-[520px] font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50"
          >
            Bimbingan belajar & mentoring proyek terstruktur untuk meningkatkan
            kemampuan teknis Anda secara nyata.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="#services" className="btn btn-primary w-full sm:w-auto">
              Mulai Belajar
            </Link>
            <Link
              href="#about"
              className="btn btn-ghost text-foreground/60 hover:text-foreground w-full sm:w-auto"
            >
              Pelajari lebih lanjut
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/30 font-semibold">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
}
