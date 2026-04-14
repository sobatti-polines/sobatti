import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import SobatValues from "@/components/SobatValues"
import TargetAudience from "@/components/TargetAudience"
import Services from "@/components/Services"
import Teams from "@/components/Teams"
import Stats from "@/components/Stats"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <SobatValues />
      <TargetAudience />
      <Stats />
      <Services />
      <Teams />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
