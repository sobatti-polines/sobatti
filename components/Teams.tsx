"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { CircularTeams } from "./ui/circular-teams";

const teamMembers = [
  {
    name: "Haydar",
    role: "Mentor, Web Dev",
    bio: "Mahasiswa D4 Teknik Rekayasa Komputer semester 6 yang suka ngoding, ngeprompt, ngajar dan ngeprompt lagi",
    src: "images/haydar.webp",
  },
  {
    name: "Rosy",
    role: "Marketing, Grapich Designer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    src: "images/rosy.webp",
  },
  {
    name: "Caca",
    role: "Marketing, Graphic Designer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    src: "images/caca.webp",
  },
  {
    name: "Agung",
    role: "Mentor, Graphic Designer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    src: "images/agung.webp",
  },
  {
    name: "Firman",
    role: "Mentor, IoT",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    src: "images/firman.webp",
  },
];

export default function Teams() {
  return (
    <section id="teams" className="bg-white section-padding my-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="05" title="tim kami" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground max-w-[550px] mb-12 md:mb-16"
        >
        dibalik <span className="text-accent-blue">Sobat</span><span className="text-accent-orange">Ti</span>
        </motion.h2>

        <div className="flex items-center justify-center">
          <CircularTeams members={teamMembers} autoplay={true} />
        </div>
      </div>
    </section>
  );
}
