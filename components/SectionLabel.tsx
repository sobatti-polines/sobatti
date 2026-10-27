"use client"

import { motion } from "framer-motion"

interface SectionLabelProps {
  readonly number: string
  readonly title: string
  readonly dark?: boolean
  readonly meta?: string
  readonly className?: string
}

export default function SectionLabel({
  number,
  title,
  dark = false,
  className = "mb-10 md:mb-14",
}: SectionLabelProps) {
  return (
    <div className={`flex items-baseline gap-5 w-full ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display text-[15px] sm:text-[17px] font-bold tracking-[-0.02em] ${
          dark ? "text-accent-orange" : "text-accent-blue"
        }`}
      >
        /{number}
      </motion.span>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-12 sm:w-20 origin-left self-center ${
          dark ? "bg-white/20" : "bg-foreground/20"
        }`}
      />

      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] uppercase ${
          dark ? "text-white/55" : "text-foreground/55"
        }`}
      >
        {title}
      </motion.span>
    </div>
  )
}
