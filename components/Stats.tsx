"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "100+", label: "siswa bimbingan" },
  { value: "50+", label: "proyek selesai" },
  { value: "5", label: "bidang teknologi" },
  { value: "100%", label: "dedikasi mentor" },
]

export default function Stats() {
  return (
    <section className="bg-dark-surface section-padding overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`text-center py-8 md:py-10 ${
                i < stats.length - 1 ? "lg:border-r lg:border-white/[0.06]" : ""
              }`}
            >
              <div className="font-display text-[clamp(36px,5vw,56px)] font-normal leading-[1.00] tracking-[-0.02em] text-white">
                {stat.value}
              </div>
              <div className="mt-3 font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-white/30">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
