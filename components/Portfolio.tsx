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
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative z-10 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <SectionLabel number="08" title="Portofolio" dark={false} />
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
              className="w-14 h-14 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-accent-blue hover:border-accent-blue hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/15 disabled:hover:text-foreground"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-14 h-14 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-accent-blue hover:border-accent-blue hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/15 disabled:hover:text-foreground"
              aria-label="Next project"
            >
              <ArrowRight className="w-6 h-6" />
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
