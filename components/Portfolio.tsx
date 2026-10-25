"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Placeholder data for the portfolio items
const portfolioItems = [
  {
    id: 1,
    client: "Anindha",
    origin: "Portofolio Website",
    image: "/images/9730A95D-FF46-4FD3-88BF-978C5F4967DA.jpg",
  },
  {
    id: 2,
    client: "Iqbal",
    origin: "Web Programming Basic",
    image: "/images/IMG-20260408-WA0210.jpg",
  },
  {
    id: 3,
    client: "Dinda",
    origin: "UIUX Basic",
    image: "/images/IMG-20260503-WA0010.jpeg",
  },
  {
    id: 4,
    client: "Stevan",
    origin: "Point of Sale System",
    image: "/images/IMG-20260513-WA0019.jpg",
  },
  {
    id: 5,
    client: "Khodir",
    origin: "Teaching Class",
    image: "/images/IMG-20260516-WA0029.jpg",
  }, {
    id: 6,
    client: "Irma",
    origin: "Portofolio Website",
    image: "/images/IMG-20260522-WA0011.jpg",
  }, {
    id: 7,
    client: "Akbar",
    origin: "Project Mentoring",
    image: "/images/IMG_20260423_171132_865.jpg",
  },
  {
    id: 8,
    client: "Davin",
    origin: "Portofolio Website",
    image: "/images/IMG_20260429_104851_510.jpg",
  },
  {
    id: 9,
    client: "Bagus",
    origin: "Mentoring Task",
    image: "/images/IMG_20260521_194211_319.jpg",
  }
];

// Project klien nyata — isi `image` dengan path screenshot di /public/images/
// (mis. "/images/erp-plk.webp"), dan sesuaikan `modules` sesuai fitur sistem.
const clientProjects = [
  {
    id: "jaggad-academy",
    client: "Jaggad Academy",
    industry: "E-Learning & Digital Products",
    description:
      "Platform edukasi digital modern untuk penjualan kelas online, kursus interaktif, dan produk digital seperti e-book. Dilengkapi integrasi payment gateway Midtrans (QRIS, VA, E-Wallet), Google OAuth login, member area & akses materi, serta dashboard CMS admin.",
    image: "/images/jaggad-academy.webp",
    modules: [
      "Katalog Kelas & E-Book",
      "Payment Gateway (Midtrans)",
      "Google OAuth Login",
      "Member Area & Akses Materi",
      "CMS Admin & Manajemen Modul",
      "Meta Pixel & CAPI Tracking",
      "Manajemen Transaksi",
      "Laporan Penjualan",
    ],
    stack: ["Laravel 12", "React 18", "Inertia.js", "MySQL", "Midtrans"],
    repo: "https://github.com/HaydarAja13/jaggad-academy.git",
  },
  {
    id: "gekrafs-ticketing",
    client: "Gekrafs Ticketing",
    industry: "Event Management & Ticketing",
    description:
      "Sistem pemesanan dan ticketing event digital terintegrasi — mencakup landing page event, alur checkout pemesanan tiket online, generate e-ticket ber-QR code otomatis via email, hingga scanner QR absensi check-in peserta di venue event.",
    image: "/images/gekrafs-ticketing.webp",
    modules: [
      "Landing Page Event",
      "Pemesanan & Checkout Tiket",
      "E-Ticket & QR Code Generator",
      "Pengiriman Tiket via Email",
      "QR Code Scanner Absensi",
      "Verifikasi Pembayaran",
      "Export Data Peserta ke Excel",
      "Sistem Referral & Komisi",
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "QR Scanner"],
    repo: "https://github.com/HaydarAja13/gekraf-event-jaggad.git",
  },
  {
    id: "plk",
    client: "Putra Logam Kencana",
    industry: "Toko Bangunan",
    description:
      "Sistem ERP + CRM terintegrasi untuk mengelola operasional toko bangunan — mulai dari stok & pembelian hingga penjualan, piutang, dan relasi pelanggan dalam satu platform.",
    image: "/images/erp-plk.webp",
    modules: [
      "Manajemen Stok",
      "Pembelian & Supplier",
      "Penjualan & Faktur",
      "Piutang & Hutang",
      "Kas & Bank",
      "Data Pelanggan (CRM)",
      "Follow-up Sales",
      "Laporan Keuangan",
    ],
    stack: ["Next.js", "Prisma"],
    link: "https://putralogamkencana.web.id",
  },
  {
    id: "askonveksi",
    client: "AsKonveksi",
    industry: "Konveksi",
    description:
      "Sistem ERP + CRM untuk bisnis konveksi — mengelola order produksi, bahan baku, progres jahit, hingga relasi pelanggan dalam satu dashboard.",
    image: "/images/erp-askonveksi.webp",
    modules: [
      "Manajemen Order",
      "Produksi & Progres",
      "Stok Bahan Baku",
      "Data Pelanggan (CRM)",
      "Follow-up Sales",
      "Faktur & Pembayaran",
      "Laporan Penjualan",
    ],
    stack: ["Next.js", "Prisma"],
    link: "https://askonveksi.web.id",
  },
];

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Adding a small buffer (5px) for browser rounding errors
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="portfolio" className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative z-10 mb-12 md:mb-16">
        <SectionLabel number="05" title="Portofolio" dark={false} />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(40px,6vw,72px)] font-normal leading-[1.00] tracking-[-0.02em] text-foreground max-w-[800px]"
        >
          Karya dan <br className="hidden sm:block" />
          Hasil Mentoring
        </motion.h2>
      </div>

      {/* ── Featured: Project Klien ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative z-10 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-orange">
            project klien
          </span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          {clientProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center bg-cool-gray/50 border border-foreground/[0.06] rounded-[24px] md:rounded-[32px] p-4 md:p-6"
            >
              {/* Screenshot */}
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[16px] md:rounded-[20px] bg-white ${index % 2 === 1 ? "md:order-2" : ""}`}>
                {("link" in project && project.link) || ("repo" in project && project.repo) ? (
                  <a
                    href={"link" in project && project.link ? project.link : ("repo" in project ? project.repo : "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full"
                    title={`Buka ${project.client}`}
                  >
                    <Image
                      src={project.image}
                      alt={`Screenshot sistem ${project.client}`}
                      fill
                      className="object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </a>
                ) : (
                  <Image
                    src={project.image}
                    alt={`Screenshot sistem ${project.client}`}
                    fill
                    className="object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                )}
              </div>

              {/* Konten */}
              <div className="px-2 md:px-4 pb-4 md:pb-6">
                <span className="inline-block font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-accent-blue bg-white px-3 py-1.5 rounded-full border border-foreground/[0.08] mb-4 md:mb-5">
                  {project.industry}
                </span>
                <h3 className="font-display text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-foreground mb-3 md:mb-4">
                  {project.client}
                </h3>
                <p className="font-body text-[15px] sm:text-[16px] leading-[1.7] text-foreground/50 mb-6 md:mb-7">
                  {project.description}
                </p>

                <div className="mb-5 md:mb-6">
                  <div className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/35 mb-3">
                    modul sistem
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.modules.map((modul) => (
                      <span
                        key={modul}
                        className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.03em] text-foreground/60 bg-white px-3 py-1.5 rounded-full border border-foreground/[0.08]"
                      >
                        {modul}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.05em] text-foreground/40 bg-cool-gray px-3 py-1.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {("link" in project || "repo" in project) && (
                  <div className="mt-5 pt-4 border-t border-foreground/[0.06] flex flex-wrap items-center gap-4">
                    {"link" in project && project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[12px] sm:text-[13px] font-semibold text-accent-blue hover:text-accent-orange transition-colors"
                      >
                        Kunjungi Website Live
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {"repo" in project && project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[12px] sm:text-[13px] font-semibold text-foreground/60 hover:text-accent-orange transition-colors"
                      >
                        Source Code GitHub
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ── Carousel: Hasil Mentoring ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative z-10 mb-8 md:mb-10">
        <div className="flex items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-orange">
              hasil mentoring
            </span>
            <div className="h-px flex-1 sm:max-w-[60px] bg-foreground/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-accent-blue hover:border-accent-blue hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/15 disabled:hover:text-foreground"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-accent-blue hover:border-accent-blue hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/15 disabled:hover:text-foreground"
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="w-full relative">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 md:px-[calc((100vw-1200px)/2+24px)] pb-12 hide-scrollbar select-none ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="flex-none w-[85vw] sm:w-[600px] lg:w-[800px] snap-center group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] md:rounded-[32px] bg-secondary-surface mb-6 md:mb-8 group-active:scale-[0.98] transition-transform duration-500">
                <Image 
                  src={item.image}
                  alt={item.client}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 pointer-events-none"
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 600px, 800px"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-2 md:gap-3 px-2 md:px-4">
                <h3 className="font-display text-[32px] md:text-[48px] leading-[1.00] text-foreground tracking-tight">
                  {item.client}
                </h3>
                <p className="font-sans text-[14px] md:text-[16px] text-accent-blue font-bold uppercase tracking-[0.15em]">
                  {item.origin}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
