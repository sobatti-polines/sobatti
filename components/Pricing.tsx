"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SectionLabel from "./SectionLabel"
import { Check } from "lucide-react"

const plans = [
  {
    name: "starter",
    price: "149K",
    period: "/bulan",
    description: "Cocok untuk pemula yang ingin memulai perjalanan IT.",
    features: [
      "Akses 1 kursus pilihan",
      "Mentoring grup mingguan",
      "Materi pembelajaran dasar",
      "Akses komunitas Discord",
      "Sertifikat penyelesaian",
    ],
    cta: "mulai starter",
    highlighted: false,
  },
  {
    name: "pro",
    price: "349K",
    period: "/bulan",
    description: "Untuk yang serius ingin menguasai skill dan membangun portofolio.",
    features: [
      "Akses semua kursus",
      "Mentoring 1-on-1 mingguan",
      "Review proyek & kode",
      "Panduan portofolio profesional",
      "Akses komunitas eksklusif",
      "Sertifikat semua kursus",
      "Prioritas support",
    ],
    cta: "pilih pro",
    highlighted: true,
  },
  {
    name: "enterprise",
    price: "custom",
    period: "",
    description: "Solusi khusus untuk tim dan organisasi.",
    features: [
      "Semua fitur Pro",
      "Kurikulum custom sesuai kebutuhan",
      "Dedicated mentor & project lead",
      "Laporan progress berkala",
      "SLA prioritas tinggi",
      "Invoice & kontrak resmi",
    ],
    cta: "hubungi kami",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-dark-surface section-padding">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel number="05" title="harga" dark />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(32px,4.5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-[550px] mb-16"
        >
          investasi untuk masa depan digital Anda
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative rounded-[20px] p-8 md:p-10 border transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "bg-dark-card border-accent-orange/40 shadow-[0_0_40px_rgba(235,96,3,0.08)]"
                  : "bg-dark-card border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-sans text-[12px] font-bold tracking-[0.15em] uppercase text-white bg-accent-orange px-4 py-1.5 rounded-full">
                    paling populer
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <span className={`font-sans text-[12px] font-bold tracking-[0.2em] uppercase ${
                  plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                }`}>
                  {plan.name}
                </span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="font-display text-[48px] md:text-[56px] font-normal leading-[1.00] tracking-[-0.02em] text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-sans text-[14px] font-medium text-white/40 ml-1">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-[17px] leading-[1.7] text-white/45 mb-8">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="rule-dark mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-[18px] h-[18px] mt-0.5 shrink-0 ${
                      plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                    }`} />
                    <span className="font-sans text-[15px] font-medium text-white/65">
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
