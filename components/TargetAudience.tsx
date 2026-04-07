"use client"

import { motion } from "framer-motion"
import SectionLabel from "./SectionLabel"

const audiences = [
  {
    tag: "pelajar",
    headline: "fondasi teknis sejak dini",
    body: "Siswa sekolah menengah membutuhkan fondasi keterampilan IT yang kuat sebelum memasuki pendidikan tinggi atau dunia kerja. Kurikulum formal sering kali belum mencakup kompetensi teknis yang relevan dengan kebutuhan industri saat ini. Mentoring terstruktur membantu pelajar membangun pemahaman praktis sejak dini.",
    metric: "SMA/SMK",
    metricLabel: "tingkat pendidikan",
  },
  {
    tag: "mahasiswa",
    headline: "proyek profesional & portofolio",
    body: "Mahasiswa menghadapi tuntutan penyelesaian proyek akademik, tugas akhir, dan persiapan memasuki pasar kerja yang kompetitif. Bimbingan teknis yang terfokus membantu mereka menyelesaikan proyek dengan standar profesional dan membangun portofolio yang relevan untuk karier di sektor digital.",
    metric: "S1/D3",
    metricLabel: "tingkat pendidikan",
  },
]

export default function TargetAudience() {
  return (
    <section id="audience" className="bg-dark-surface section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="02" title="target audiens" dark />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-[550px] mb-12 md:mb-16"
        >
          siapa yang kami layani
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-dark-card rounded-[16px] md:rounded-[20px] p-7 sm:p-10 md:p-12 border border-white/[0.06] transition-all duration-300 hover:border-accent-orange/30"
            >
              {/* Tag */}
              <div className="mb-6 md:mb-8">
                <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-orange">
                  {item.tag}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-display text-[24px] sm:text-[28px] md:text-[32px] font-normal leading-[1.15] tracking-[-0.01em] text-white mb-4 md:mb-5">
                {item.headline}
              </h3>

              {/* Body */}
              <p className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-white/45 mb-8 md:mb-10">
                {item.body}
              </p>

              {/* Bottom metric */}
              <div className="pt-5 md:pt-6 border-t border-white/[0.06]">
                <div className="font-display text-[18px] sm:text-[20px] text-white font-normal">{item.metric}</div>
                <div className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mt-1">
                  {item.metricLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
