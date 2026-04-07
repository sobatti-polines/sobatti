"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionLabel from "./SectionLabel";

const services = [
  {
    title: "Web Development",
    description:
      "Pelajari pengembangan web modern dari front-end hingga back-end. Bangun aplikasi web yang fungsional, responsif, dan siap produksi.",
    tags: ["React", "Next.js", "Node"],
  },
  {
    title: "Mobile Development",
    description:
      "Kuasai pengembangan aplikasi mobile untuk iOS dan Android. Rilis aplikasi yang stabil, mudah digunakan, dan sesuai standar industri.",
    tags: ["Flutter", "React Native", "Swift"],
  },
  {
    title: "UI/UX Design",
    description:
      "Pelajari prinsip desain antarmuka dan pengalaman pengguna yang efektif. Ciptakan desain yang intuitif dan berorientasi pengguna.",
    tags: ["Figma", "Prototyping", "Riset"],
  },
  {
    title: "Video Editting",
    description:
      "Tingkatkan kemampuan penyuntingan video profesional dari teknik dasar hingga lanjutan. Hasil berkualitas tinggi untuk berbagai platform digital.",
    tags: ["Premiere", "After Effects", "DaVinci"],
  },
  {
    title: "Internet of Things",
    description:
      "Pelajari pengembangan IoT dari perangkat keras hingga integrasi sistem. Bangun solusi IoT yang fungsional dan terukur.",
    tags: ["Arduino", "ESP32", "MQTT"],
  },
];

// Individual row — uses display:contents so children participate in parent grid
function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <>
      <div className="h-px w-full bg-foreground/[0.06] col-span-1 md:col-span-3" />
      {/* Title column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "-50px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group flex items-baseline gap-3 md:gap-4 py-8 md:py-12 cursor-default"
      >
        <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-foreground/25 tabular-nums shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-[1.15] tracking-[-0.01em] text-accent-blue group-hover:text-accent-orange transition-colors duration-300">
          {service.title}
        </h3>
      </motion.div>

      {/* Description column */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05 + 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50 py-8 md:py-12"
      >
        {service.description}
      </motion.p>

      {/* Tags column */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.05 + 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-wrap gap-2 justify-start md:justify-end py-8 md:py-12 self-start"
      >
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.05em] text-foreground/40 bg-cool-gray px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </>
  );
}

// Section-level scroll progress line
function ScrollProgressLine() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      className="fixed top-[64px] md:top-[72px] left-0 right-0 z-40 h-[2px] bg-transparent"
    >
      <motion.div
        className="h-full bg-accent-orange origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-white section-padding">
      <ScrollProgressLine />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="04" title="layanan" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground max-w-[550px] mb-12 md:mb-16"
        >
          layanan pembelajaran kami
        </motion.h2>

        {/* Service list — single grid so all columns align */}
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.2fr_auto] gap-0">
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
          <div className="rule col-span-1 md:col-span-3" />
        </div>
      </div>
    </section>
  );
}
