"use client"

import { motion } from "framer-motion"

interface SectionLabelProps {
  number: string
  title: string
  dark?: boolean
}

export default function SectionLabel({ number, title, dark = false }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <span className={`font-sans text-sm font-bold tracking-[0.2em] uppercase ${dark ? "text-accent-orange" : "text-accent-blue"}`}>
        {number}
      </span>
      <div className={`h-px flex-1 max-w-[60px] ${dark ? "bg-white/15" : "bg-foreground/15"}`} />
      <span className={`font-sans text-sm font-semibold tracking-[0.15em] uppercase ${dark ? "text-white/40" : "text-foreground/40"}`}>
        {title}
      </span>
    </motion.div>
  )
}
