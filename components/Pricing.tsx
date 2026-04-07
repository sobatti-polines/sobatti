"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SectionLabel from "./SectionLabel"
import { Check } from "lucide-react"

const plans = [
  {
    name: "starter",
    price: "Rp25.000",
    period: "/1.5 jam",
    subtitle: "Konsultasi & Problem Solving",
    description: "Cocok untuk klien yang sudah punya kode/proyek tapi mentok di bug tertentu atau butuh arahan logika.",
    target: "Siswa/mahasiswa yang sedang mengerjakan tugas mandiri.",
    features: [
      "Sesi konsultasi 30-60 menit",
      "Bug fixing ringan (maksimal 2-3 error)",
      "Penjelasan logika program secara garis besar",
      "Estimasi pengerjaan cepat (1-2 hari)",
    ],
    cta: "konsultasi sekarang",
    highlighted: false,
  },
  {
    name: "pro",
    price: "Rp100.000",
    period: "/project",
    subtitle: "Full Project & Guidance",
    description: "Paket terlaris untuk jasa pembuatan proyek end-to-end, seperti sistem IoT atau Web.",
    target: "Mahasiswa tugas akhir atau klien yang butuh produk jadi.",
    features: [
      "Pembuatan program/sistem dari nol sesuai request",
      "Dokumentasi lengkap (penjelasan kode/skema rangkaian)",
      "Revisi terbatas (2-3 kali revisi)",
      "Sesi bimbingan/tutorial via Zoom/Meet",
      "Garansi maintenance 1 minggu setelah serah terima",
    ],
    cta: "pesan paket pro",
    highlighted: true,
  },
  {
    name: "enterprise",
    price: "Custom",
    period: "",
    subtitle: "Priority & High-Complexity",
    description: "Untuk proyek yang sangat rumit, kebutuhan industri, atau permintaan deadline yang sangat mepet.",
    target: "Klien profesional, UMKM, atau kebutuhan mendesak.",
    features: [
      "Prioritas antrean (pengerjaan paling didahului)",
      "Integrasi sistem kompleks (IoT + Cloud + Web Dashboard)",
      "Support 24/7 hingga proyek selesai/sidang",
      "Laporan kemajuan berkala (daily report)",
      "Termasuk pengadaan komponen (jika proyek fisik/hardware)",
    ],
    cta: "hubungi kami",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-dark-surface section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="06" title="harga" dark />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-[550px] mb-12 md:mb-16"
        >
          investasi untuk masa depan digital Anda
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative rounded-[16px] md:rounded-[20px] p-7 sm:p-8 md:p-10 border transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "bg-dark-card border-accent-orange/40 shadow-[0_0_40px_rgba(235,96,3,0.08)]"
                  : "bg-dark-card border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-white bg-accent-orange px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full">
                    paling populer
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-3 md:mb-4">
                <span className={`font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase ${
                  plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                }`}>
                  {plan.name}
                </span>
              </div>

              {/* Subtitle */}
              <div className="mb-4 md:mb-6">
                <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-white/60">
                  {plan.subtitle}
                </span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="font-display text-[32px] sm:text-[36px] md:text-[44px] font-normal leading-[1.00] tracking-[-0.02em] text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-sans text-[13px] sm:text-[14px] font-medium text-white/40 ml-1">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-white/45 mb-3">
                {plan.description}
              </p>

              {/* Target */}
              <p className="font-body text-[13px] sm:text-[14px] leading-[1.6] text-white/30 mb-6 md:mb-8 italic">
                Target: {plan.target}
              </p>

              {/* Divider */}
              <div className="rule-dark mb-6 md:mb-8" />

              {/* Features */}
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] mt-0.5 shrink-0 ${
                      plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                    }`} />
                    <span className="font-sans text-[14px] sm:text-[15px] font-medium text-white/65">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#contact"
                className={`btn w-full py-3 ${
                  plan.highlighted
                    ? "bg-accent-orange text-white border-accent-orange hover:bg-hover-orange hover:border-hover-orange"
                    : "bg-transparent text-white border-white/15 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
