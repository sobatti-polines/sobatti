"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate";
import SectionLabel from "./SectionLabel";

const values = [
  {
    letter: "S",
    word: "Solutif",
    description:
      "Mampu memecahkan masalah. Tidak sekadar menghafal teori, tapi menggunakan teknologi (kode, alat, atau desain) sebagai solusi yang nyata.",
  },
  {
    letter: "O",
    word: "Optimis",
    description:
      "Membangun lingkungan belajar yang positif, di mana hal rumit seperti mikrokontroler atau framework web bisa dipelajari oleh siapa saja.",
  },
  {
    letter: "B",
    word: "Bersahabat",
    description:
      "Lingkungan belajar yang hangat, suportif, dan kolaboratif. Kami membangun hubungan yang nyaman antara mentor dan peserta agar proses belajar terasa menyenangkan dan efektif.",
  },
  {
    letter: "A",
    word: "Adaptif",
    description:
      "Fleksibel dan selalu update dengan teknologi terbaru, baik itu tren desain antarmuka masa kini maupun perkembangan perangkat keras.",
  },
  {
    letter: "T",
    word: "Terampil",
    description:
      "Hasil nyata yang terukur dalam keterampilan teknis. Setiap sesi dirancang untuk menghasilkan kompetensi yang bisa langsung diaplikasikan dalam proyek dan dunia kerja.",
  },
];

function ValueRow({
  value,
  index,
  onInView,
}: {
  value: (typeof values)[number];
  index: number;
  onInView: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -70% 0px" });

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="py-8 md:py-10 cursor-default"
    >
      <div className="flex items-baseline gap-3 md:gap-4 mb-4">
        <span className="font-display text-[clamp(36px,6vw,64px)] font-normal leading-[1.00] tracking-[-0.02em] text-accent-orange">
          {value.letter}
        </span>
        <span className="font-display text-[clamp(20px,3vw,32px)] font-normal leading-[1.15] tracking-[-0.01em] text-accent-blue">
          {value.word}
        </span>
      </div>
      <p className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50 max-w-[560px]">
        {value.description}
      </p>
    </motion.div>
  );
}

export default function SobatValues() {
  const textRotateRef = useRef<TextRotateRef>(null);

  const handleInView = (index: number) => {
    textRotateRef.current?.jumpTo(index);
  };

  return (
    <section id="values" className="bg-white section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="02" title="S.O.B.A.T" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Left — Sticky heading with TextRotate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-[120px]"
          >
            <h2 className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground max-w-[480px]">
              Mengapa{" "}
              <span className="relative">
                <span className="relative z-10 text-accent-orange">Kita</span>
                <span className="absolute inset-0 bg-accent-orange/20 rotate-4 scale-y-110 scale-x-120" />
              </span>{" "}
              <span className="hidden sm:inline">
                <TextRotate
                  ref={textRotateRef}
                  texts={values.map((v) => v.word)}
                  mainClassName="text-accent-orange"
                  splitLevelClassName="overflow-hidden pb-1"
                  staggerFrom="first"
                  animatePresenceMode="wait"
                  loop={false}
                  auto={false}
                  staggerDuration={0.02}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              </span>
              <span className="sm:hidden text-accent-orange">S.O.B.A.T</span>
            </h2>
          </motion.div>

          {/* Right — Scrollable value rows */}
          <div>
            {values.map((value, i) => (
              <div key={value.letter}>
                {i > 0 && <div className="rule" />}
                <ValueRow
                  value={value}
                  index={i}
                  onInView={() => handleInView(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
