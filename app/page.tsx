import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"

const About = dynamic(() => import("@/components/About"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const SobatValues = dynamic(() => import("@/components/SobatValues"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const TargetAudience = dynamic(() => import("@/components/TargetAudience"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Services = dynamic(() => import("@/components/Services"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Teams = dynamic(() => import("@/components/Teams"), {
  ssr: true,
  loading: () => <div className="min-h-screen section-padding" />,
})
const Stats = dynamic(() => import("@/components/Stats"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Pricing = dynamic(() => import("@/components/Pricing"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
})
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
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
