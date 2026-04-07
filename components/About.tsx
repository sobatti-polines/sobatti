"use client"

import { motion } from "framer-motion"
import SectionLabel from "./SectionLabel"

export default function About() {
  return (
    <section id="about" className="bg-white section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="01" title="tentang kami" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Left — Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground max-w-[550px]">
              platform bimbingan IT
              <span className="text-accent-orange"> yang membantu Anda berkembang</span>
            </h2>
          </motion.div>

          {/* Right — Body */}
          <div className="space-y-5 sm:space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50"
            >
              SobatTi hadir untuk menyediakan layanan pembelajaran dan mentoring IT berkualitas tinggi bagi individu yang ingin meningkatkan kompetensi di bidang teknologi. Kami memberikan pendampingan terstruktur dalam peningkatan keterampilan dan penyelesaian proyek, memastikan setiap peserta mendapatkan hasil yang terukur.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50"
            >
              Kami membangun lingkungan belajar kolaboratif yang menghubungkan peserta dengan mentor berpengalaman, sekaligus menyediakan solusi praktis yang disesuaikan dengan kebutuhan digital masing-masing individu.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-[16px] sm:text-[18px] font-semibold leading-[1.5] text-foreground"
            >
              Tujuan kami — membantu Anda mengembangkan keterampilan dan menyelesaikan proyek digital dengan mudah dan adaptif.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
