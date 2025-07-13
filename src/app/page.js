import HeroSection from "@/components/HeroSection"
import FeaturedRooms from "@/components/FeaturedRooms"
import Services from "@/app/services/page"
import About from "@/app/about/page"
import Contact from "@/app/contact/page"


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedRooms />
      <Services />
      <About />
      <Contact />
    </div>
  )
}
