import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import CTASection from "@/components/cta-section"
import PestGallery from "@/components/pest-gallery"
import ServiceAreas from "@/components/service-areas"
import StaticTestimonials from "@/components/static-testimonials"

export default function Home() {
  return (
    <>
      <Hero key="hero-section" />
      <Services key="services-section" />
      <WhyChooseUs key="why-choose-us-section" />
      <PestGallery key="pest-gallery-section" />
      <StaticTestimonials key="testimonials-section" />
      <ServiceAreas key="service-areas-section" />
      <CTASection key="cta-section" />
    </>
  )
}
