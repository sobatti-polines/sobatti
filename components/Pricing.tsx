"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { Check, MessageCircle } from "lucide-react";

const WA_NUMBER = "6285327072575";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

const schoolPackages = [
  {
    level: "sd",
    name: "Paket Les SD",
    price: "Rp200.000",
    period: "/8 pertemuan",
    subtitle: "Pengenalan Komputer & TIK",
    description:
      "Bimbingan les yang menyenangkan untuk anak SD — mengenal komputer, mengetik, hingga tugas sekolah lebih terbantu.",
    target: "Kelas 1–6 SD",
    features: [
      "8 pertemuan (1x seminggu)",
      "Mengenal komputer, mengetik, & Office dasar",
      "Bimbingan tugas sekolah",
      "Laporan perkembangan anak",
    ],
    cta: "Pesan Paket SD",
    highlighted: false,
  },
  {
    level: "smp",
    name: "Paket Les SMP",
    price: "Rp300.000",
    period: "/8 pertemuan",
    subtitle: "Dasar Pemrograman & TIK",
    description:
      "Paket terpopuler — membangun fondasi TIK dan pemrograman sederhana untuk siswa SMP sebelum naik jenjang.",
    target: "Kelas 7–9 SMP",
    features: [
      "8 pertemuan (1x seminggu)",
      "Dasar pemrograman (Scratch / Python ringan)",
      "Bimbingan tugas & proyek sekolah",
      "Laporan perkembangan siswa",
    ],
    cta: "Pesan Paket SMP",
    highlighted: true,
  },
  {
    level: "sma",
    name: "Paket Les SMA/SMK",
    price: "Rp400.000",
    period: "/8 pertemuan",
    subtitle: "Persiapan & Proyek Digital",
    description:
      "Untuk siswa SMA/SMK yang butuh penguatan TIK, bantuan tugas, atau pendampingan proyek kelas.",
    target: "Kelas 10–12 SMA/SMK",
    features: [
      "8 pertemuan (1x seminggu)",
      "Materi TIK sesuai kurikulum",
      "Bantuan proyek & tugas sekolah",
      "Laporan perkembangan siswa",
    ],
    cta: "Pesan Paket SMA",
    highlighted: false,
  },
];

const categories = [
  {
    id: "les",
    label: "Les & Konsultasi",
    items: [
      { name: "Les Private 60 menit", price: "Rp25.000" },
      { name: "Les Private 90 menit", price: "Rp35.000" },
      { name: "Konsultasi 60 menit", price: "Rp50.000" },
      { name: "Problem Solving kompleks", price: "Mulai Rp75.000" },
    ],
  },
  {
    id: "project",
    label: "Project",
    items: [
      { name: "Basic Project", price: "Mulai Rp300.000" },
      { name: "Intermediate Project", price: "Mulai Rp750.000" },
      { name: "Advanced Project", price: "Mulai Rp1.500.000" },
      { name: "Custom Project", price: "Mulai Rp3.000.000" },
    ],
  },
  {
    id: "website",
    label: "Website UMKM",
    items: [
      { name: "Landing Page UMKM", price: "Mulai Rp750.000" },
      { name: "Company Profile UMKM", price: "Mulai Rp1.500.000" },
      { name: "Catalog Website", price: "Mulai Rp2.000.000" },
      { name: "Web App", price: "Mulai Rp3.000.000" },
    ],
  },
  {
    id: "iot",
    label: "IoT",
    items: [
      { name: "IoT Basic", price: "Mulai Rp300.000" },
      { name: "IoT Intermediate", price: "Mulai Rp750.000" },
      { name: "IoT Advanced", price: "Mulai Rp2.000.000" },
    ],
  },
  {
    id: "uiux",
    label: "UI/UX",
    items: [
      { name: "UI/UX Basic", price: "Mulai Rp300.000" },
      { name: "UI/UX Intermediate", price: "Mulai Rp750.000" },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    items: [{ name: "Maintenance", price: "Mulai Rp150.000/bulan" }],
  },
];

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-orange">
        {children}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function PriceRow({
  item,
  index,
}: {
  item: { name: string; price: string };
  index: number;
}) {
  const [prefix, ...rest] = item.price.startsWith("Mulai ")
    ? ["Mulai ", item.price.slice(6)]
    : ["", item.price];

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={waLink(`Halo SobatTi, saya mau tanya layanan "${item.name}" (${item.price}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-baseline justify-between gap-4 py-4 md:py-5 border-t border-white/[0.06] first:border-t-0 -mx-2 px-2 rounded-lg hover:bg-white/[0.03] transition-colors duration-200"
      >
        <span className="font-sans text-[14px] sm:text-[16px] font-medium text-white/70 group-hover:text-white transition-colors duration-200">
          {item.name}
        </span>
        <span className="flex items-baseline gap-2 sm:gap-3 shrink-0">
          <span className="font-display text-[16px] sm:text-[18px] font-normal text-white tabular-nums text-right">
            {prefix && <span className="text-white/40 font-sans text-[13px] sm:text-[14px] mr-1">{prefix}</span>}
            {rest.join("")}
          </span>
          <MessageCircle className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] text-white/25 group-hover:text-accent-orange transition-colors duration-200 translate-y-[2px]" />
        </span>
      </a>
    </motion.li>
  );
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <section id="pricing" className="bg-dark-surface section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="06" title="harga" dark />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-[700px] mb-12 md:mb-16"
        >
          Investasi untuk{" "}
          <span className="relative">
            <span className="relative z-10 text-white">Masa Depan</span>
            <span className="absolute inset-0 bg-accent-orange/30 -rotate-2 scale-y-110 scale-x-120" />
          </span>{" "}
          digital Anda
        </motion.h2>

        {/* ── Paket Les Sekolah ── */}
        <BlockLabel>paket les sekolah</BlockLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-24">
          {schoolPackages.map((plan, i) => (
            <motion.div
              key={plan.level}
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
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-white bg-accent-orange px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full whitespace-nowrap">
                    paling populer
                  </span>
                </div>
              )}

              <div className="mb-3 md:mb-4">
                <span
                  className={`font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase ${
                    plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                  }`}
                >
                  {plan.name}
                </span>
              </div>

              <div className="mb-4 md:mb-6">
                <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-white/60">
                  {plan.subtitle}
                </span>
              </div>

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

              <p className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-white/45 mb-3">
                {plan.description}
              </p>

              <p className="font-body text-[13px] sm:text-[14px] leading-[1.6] text-white/30 mb-6 md:mb-8 italic">
                Untuk: {plan.target}
              </p>

              <div className="rule-dark mb-6 md:mb-8" />

              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-accent-orange" : "text-accent-blue"
                      }`}
                    />
                    <span className="font-sans text-[14px] sm:text-[15px] font-medium text-white/65">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={waLink(`Halo SobatTi, saya mau tanya ${plan.name} (${plan.price}${plan.period}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full !py-3.5 !px-6 ${
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

        {/* ── Daftar Harga Lengkap ── */}
        <BlockLabel>daftar harga lengkap</BlockLabel>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(22px,3.5vw,36px)] font-normal leading-[1.15] tracking-[-0.02em] text-white max-w-[600px] mb-8 md:mb-10"
        >
          Pilih layanan sesuai kebutuhan Anda
        </motion.h3>

        {/* Tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 md:mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Kategori layanan"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.08em] uppercase px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark-surface ${
                activeCategory === cat.id
                  ? "bg-accent-orange text-white border-accent-orange"
                  : "bg-transparent text-white/50 border-white/15 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-dark-card border border-white/[0.06] rounded-[16px] md:rounded-[20px] p-6 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.ul
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {current.items.map((item, i) => (
                <PriceRow key={item.name} item={item} index={i} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* ── Footnote + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <p className="font-body text-[13px] sm:text-[14px] leading-[1.7] text-white/35 max-w-[640px]">
            Harga bersifat mulai dari — disesuaikan dengan kompleksitas & ruang
            lingkup pekerjaan. Hosting, domain, komponen hardware, dan transport
            tidak termasuk dalam harga di atas.
          </p>
          <Link
            href={waLink("Halo SobatTi, saya mau minta penawaran untuk layanan yang tersedia.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-accent-orange text-white border border-accent-orange hover:bg-hover-orange hover:border-hover-orange hover:-translate-y-px shrink-0 !py-[14px] !px-8"
          >
            Minta Penawaran
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
