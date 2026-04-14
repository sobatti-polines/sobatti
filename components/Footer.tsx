import Link from "next/link"

const footerLinks = [
  {
    heading: "layanan",
    links: [
      { label: "pengembangan web", href: "#services" },
      { label: "aplikasi mobile", href: "#services" },
      { label: "desain ui/ux", href: "#services" },
      { label: "penyuntingan video", href: "#services" },
      { label: "internet of things", href: "#services" },
    ],
  },
  {
    heading: "perusahaan",
    links: [
      { label: "tentang kami", href: "#about" },
      { label: "layanan", href: "#services" },
      { label: "hubungi kami", href: "#contact" },
    ],
  },
  {
    heading: "sosial",
    links: [
      { label: "instagram", href: "https://instagram.com/sobat.ti" },
      { label: "tiktok", href: "https://tiktok.com/@sobat.ti" },
      { label: "whatsapp", href: "https://wa.me/62895365896938" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-surface pt-16 pb-8 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-[22px] sm:text-[24px] font-medium tracking-tight text-accent-orange">
              sobatti
            </Link>
            <p className="mt-4 md:mt-5 font-body text-[15px] sm:text-[17px] leading-[1.7] text-white/35 max-w-[220px]">
              Platform bimbingan IT dan mentoring proyek terlengkap dan terpercaya.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5 md:mb-6">
                {col.heading}
              </h4>
              <ul className="space-y-3 md:space-y-3.5">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http")
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                        className="font-sans text-[14px] sm:text-[15px] font-medium text-white/45 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="rule-dark mt-12 md:mt-16 mb-0" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 md:pt-8">
          <p className="font-sans text-[13px] sm:text-[14px] font-medium text-white/25">
            © {new Date().getFullYear()} sobatti. hak cipta dilindungi.
          </p>
          <p className="font-sans text-[13px] sm:text-[14px] font-medium text-white/25">
            bimbingan belajar & mentoring proyek IT
          </p>
        </div>
      </div>
    </footer>
  )
}
