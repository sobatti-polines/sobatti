"use client"

import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import SobatValues from "@/components/SobatValues"
import TargetAudience from "@/components/TargetAudience"
import Stats from "@/components/Stats"
import Services from "@/components/Services"
import Portfolio from "@/components/Portfolio"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <SobatValues />
        <TargetAudience />
        <Stats />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
