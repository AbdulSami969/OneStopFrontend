import Hero from "@/components/hero";
import Services from "@/components/services";
import WhyChooseUs from "@/components/why-choose-us";
import CTASection from "@/components/cta-section";
import PestGallery from "@/components/pest-gallery";
import ServiceAreas from "@/components/service-areas";
import StaticTestimonials from "@/components/static-testimonials";
import { getHomepage } from "@/lib/queries/homepage";
import TestimonialsSection from "@/components/testimonials-section";

export default async function Home() {
  // Fetch data from Sanity
  const homepage = await getHomepage();
  console.log(homepage);
  return (
    <>
      <Hero data={homepage?.heroSection} key="hero-section" />
      <Services data={homepage?.servicesSection} key="services-section" />
      <WhyChooseUs data={homepage?.whyChooseUsSection} key="why-choose-us-section" />
      <PestGallery data={homepage?.pestGallerySection} key="pest-gallery-section" />
      {/* <StaticTestimonials data={homepage?.testimonialsSection} key="testimonials-section" /> */}
      {homepage.testimonialsSection && <TestimonialsSection heading={homepage.testimonialsSection.title} testimonials={homepage.testimonialsSection.testimonials} button={homepage.testimonialsSection.ctaButton.text} link={homepage.testimonialsSection.ctaButton.link} />}

      <ServiceAreas data={homepage?.serviceAreasSection} key="service-areas-section" />
      <CTASection data={homepage?.ctaSection} key="cta-section" />
    </>
  );
}
