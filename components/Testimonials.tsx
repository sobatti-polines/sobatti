"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Rizki",
    role: "Mahasiswa Teknik Informatika",
    university: "ITS Surabaya",
    avatar: "AR",
    rating: 5,
    text: "SobatTi bantu aku nemuin bug yang udah 2 minggu bikin stres. Sebelumnya udah coba cari solusi di Google & Stack Overflow ga ketemu-ketemu, eh ternyata masalahnya simpel banget. Terima kasih buatnya juga!",
  },
  {
    name: "Siti Nurhaliza",
    role: "Mahasiswa Sistem Informasi",
    university: "Universitas Indonesia",
    avatar: "SN",
    rating: 5,
    text: "Pas banget butuh bantuan buat skripsi, akhirnya bisa selesai tepat waktu! Mas Bowo sangat membantu menjelaskan step by step sampai aku paham. Highly recommended buat yang butuh mentor sabar!",
  },
  {
    name: "Deni Pratama",
    role: "Pelajar SMA",
    university: "SMAN 1 Jakarta",
    avatar: "DP",
    rating: 5,
    text: "Awalnya cuma mau belajar coding dasar, eh malah dapat banyak banget ilmu tambahan tentang cara belajar yang benar. Sekarang udah bisa buat website sendiri!",
  },
  {
    name: "Maya Santos",
    role: "Mahasiswa Desain Komunikasi Visual",
    university: "ITB Bandung",
    avatar: "MS",
    rating: 5,
    text: "Bingung mau buat proyek akhir yang unik, terus cari mentor yang bisa bantu aku sambil belajar skill baru. Mas Bowo bantu dari nol sampe jadi, dokumentasinya juga lengkap banget!",
  },
];

function FeaturedTestimonial() {
  const featured = testimonials[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative mb-14 md:mb-20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/40 via-accent-orange/30 to-accent-blue/40 rounded-[28px] blur-[50px] opacity-25" />

      <div className="relative bg-dark-card/60 backdrop-blur-md border border-white/[0.1] rounded-[24px] p-8 sm:p-10 md:p-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-orange/20 rounded-full mb-6">
          <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-accent-orange">
            Testimoni Pilihan
          </span>
        </div>

        <Quote className="w-10 h-10 text-accent-orange/30 mb-4" />

        <p className="font-display text-[22px] sm:text-[27px] md:text-[32px] leading-[1.45] text-white/85 mb-8">
          &ldquo;{featured.text}&rdquo;
        </p>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent-blue/15 flex items-center justify-center ">
            <span className="font-sans text-[16px] font-bold text-accent-blue">
              {featured.avatar}
            </span>
          </div>
          <div>
            <div className="font-sans text-[16px] font-semibold text-white">
              {featured.name}
            </div>
            <div className="font-sans text-[13px] text-white/50">
              {featured.role} — {featured.university}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="group relative bg-dark-card/50 border border-white/[0.06] rounded-[20px] p-6 sm:p-7 transition-all duration-500"
    >
      <Quote className="absolute top-5 right-5 w-7 h-7 text-accent-orange/25 transition-colors duration-300" />

      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, j) => (
          <Star
            key={j}
            className="w-[12px] h-[12px] fill-accent-orange text-accent-orange"
          />
        ))}
      </div>

      <p className="font-body text-[14px] sm:text-[15px] leading-[1.8] text-white/65 mb-5 relative z-10 line-clamp-[4]">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
        <div className="w-10 h-10 rounded-full bg-accent-blue/15 flex items-center justify-center">
          <span className="font-sans text-[12px] font-bold text-accent-blue">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <div className="font-sans text-[14px] font-semibold text-white">
            {testimonial.name}
          </div>
          <div className="font-sans text-[11px] text-white/35">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-dark-surface section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-accent-blue/8 rounded-full blur-[80px]" />
        <div className="absolute bottom-[15%] right-[-5%] w-[280px] h-[280px] bg-accent-orange/8 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative">
        <SectionLabel number="07" title="testimoni" dark />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-[700px] mb-12 md:mb-16"
        >
          Apa yang{" "}
          <span className="relative">
            <span className="relative z-10 text-white">klien</span>
            <span className="absolute inset-0 bg-accent-orange/30 -rotate-2 scale-y-110 scale-x-120" />
          </span>{" "}
          katakan tentang kami
        </motion.h2>

        <FeaturedTestimonial />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.slice(1).map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
