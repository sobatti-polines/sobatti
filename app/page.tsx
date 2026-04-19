"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"

const About = dynamic(() => import("@/components/About"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const SobatValues = dynamic(() => import("@/components/SobatValues"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const TargetAudience = dynamic(() => import("@/components/TargetAudience"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Services = dynamic(() => import("@/components/Services"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Teams = dynamic(() => import("@/components/Teams"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] section-padding" />,
})
const Stats = dynamic(() => import("@/components/Stats"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Pricing = dynamic(() => import("@/components/Pricing"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="h-32" />,
})

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-2 border-accent-blue/20 border-t-accent-blue rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <SobatValues />
          <TargetAudience />
          <Stats />
          <Services />
          <Teams />
          <Pricing />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
