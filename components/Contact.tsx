"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SectionLabel from "./SectionLabel"

export default function Contact() {
  return (
    <section id="contact" className="bg-white section-padding">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionLabel number="07" title="kontak" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-[clamp(28px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground max-w-[550px]">
              siap untuk
              <span className="text-accent-orange"> memulai?</span>
            </h2>
            <p className="mt-5 md:mt-6 font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50 max-w-[440px]">
              Hubungi kami langsung melalui WhatsApp atau ikuti akun media sosial kami untuk informasi terbaru.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="https://wa.me/62895365896938"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                hubungi via whatsapp
              </Link>
              <Link
                href="https://instagram.com/sobat.ti"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                ikuti instagram
              </Link>
            </div>
          </motion.div>

          {/* Right — Info card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-cool-gray rounded-[16px] sm:rounded-[20px] p-7 sm:p-8 md:p-10"
          >
            <h3 className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-foreground/35 mb-6 md:mb-8">
              informasi kontak
            </h3>

            <div className="space-y-5 md:space-y-6">
              <div>
                <div className="font-sans text-[12px] sm:text-[13px] font-semibold text-foreground/40 mb-1 lowercase">whatsapp</div>
                <Link
                  href="https://wa.me/62895365896938"
                  target="_blank"
                  className="font-sans text-[15px] sm:text-[17px] font-semibold text-foreground hover:text-accent-orange transition-colors"
                >
                  +62 895-3658-96938
                </Link>
              </div>

              <div className="rule" />

              <div>
                <div className="font-sans text-[12px] sm:text-[13px] font-semibold text-foreground/40 mb-1 lowercase">instagram</div>
                <Link
                  href="https://instagram.com/sobat.ti"
                  target="_blank"
                  className="font-sans text-[15px] sm:text-[17px] font-semibold text-foreground hover:text-accent-orange transition-colors"
                >
                  @sobat.ti
                </Link>
              </div>

              <div className="rule" />

              <div>
                <div className="font-sans text-[12px] sm:text-[13px] font-semibold text-foreground/40 mb-1 lowercase">tiktok</div>
                <Link
                  href="https://tiktok.com/@sobat.ti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] sm:text-[17px] font-semibold text-foreground hover:text-accent-orange transition-colors"
                >
                  @sobat.ti
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
