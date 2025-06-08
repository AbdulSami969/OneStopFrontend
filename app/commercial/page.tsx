import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Check, Building2, ShieldCheck, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/cta-section";
import ServiceAreas from "@/components/service-areas";
import TestimonialsSection from "@/components/testimonials-section";
import { client } from "@/lib/sanity.client";
import { commercialPageQuery } from "@/lib/queries/commercialPage";
import { PortableText, PortableTextComponents } from "@portabletext/react";

interface CommercialPageData {
  _id: string;
  title: string;
  heroSection?: {
    heading_title?: string;
    heading?: string;
    subheading?: string;
    description?: string;
    backgroundImageUrl?: string;
    scheduleButton?: { text?: string; path?: string };
    contact_button?: { text?: string; path?: string };
  };
  reviewBanner?: {
    text?: string;
    rating?: number;
    google_review_button?: { text?: string; external_path?: string };
  };
  mainContentSection?: {
    heading?: string;
    description?: string;
    features?: {
      title?: string;
      icon?: string;
      description?: string;
    }[];
  };
  industriesSection?: {
    heading?: string;
    industries?: {
      title?: string;
      imageUrl?: string;
      description?: string;
    }[];
  };
  servicesSection?: {
    heading?: string;
    services?: {
      title?: string;
      description?: string;
    }[];
  };
  processSection?: {
    heading?: string;
    steps?: {
      number?: string;
      title?: string;
      description?: string;
    }[];
  };
  whyChooseUsSection?: {
    heading?: string;
    features?: {
      title?: string;
      description?: string;
    }[];
    cta_button?: { text?: string; path?: string };
  };
  testimonialsSection?: {
    heading?: string;
    testimonials?: TestimonialReference[];
    button?: string;
    link?: string;
  };
  serviceAreasSection?: {
    heading?: string;
    description?: string;
    areas?: string[];
  };
  faqSection?: {
    heading?: string;
    faqs?: FaqReference[];
  };
  ctaSection?: {
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

interface TestimonialReference {
  _id: string;
  name?: string;
  testimonial?: string;
  company?: string;
  imageUrl?: string;
  rating?: number;
  externalLink?: string;
}

interface FaqReference {
  _id: string;
  question?: string;
  answer?: any;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-lg">{children}</p>,
  },
};

export async function generateMetadata() {
  const pageData: CommercialPageData = await client.fetch(commercialPageQuery);
  return {
    title: pageData?.title || "Commercial Pest Control | 1 Stop Pest Control",
    description: pageData?.mainContentSection?.description || "Professional commercial pest control services for businesses in the Albany Capital Region. Protect your reputation, employees, and customers with our customized pest control solutions.",
  };
}

export default async function CommercialPage() {
  const pageData: CommercialPageData = await client.fetch(commercialPageQuery);

  if (!pageData) {
    return <div className="container mx-auto py-12 text-center">Failed to load page data. Please try again later.</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen sm:h-[70vh] min-h-[500px] bg-gray-900 flex items-center pt-20 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <Image src={pageData.heroSection?.backgroundImageUrl || "/images/commercial-hero.png"} alt="Albany commercial buildings" fill className="object-cover opacity-40" priority />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {pageData.heroSection?.heading_title && <p className="text-lg font-medium mb-4">{pageData.heroSection.heading_title}</p>}
            {pageData.heroSection?.heading && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">{pageData.heroSection.heading}</h1>}
            {pageData.heroSection?.subheading && <p className="text-xl md:text-2xl font-bold mb-4">{pageData.heroSection.subheading}</p>}
            {pageData.heroSection?.description && <p className="text-lg mb-8">{pageData.heroSection.description}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {pageData.heroSection?.scheduleButton?.text && pageData.heroSection.scheduleButton.path && (
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-6 text-lg w-auto md:w-auto">
                  <Link href={pageData.heroSection.scheduleButton.path} className="flex items-center gap-2">
                    {pageData.heroSection.scheduleButton.text}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {pageData.heroSection?.contact_button?.text && pageData.heroSection.contact_button.path && (
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                  <Link href={pageData.heroSection.contact_button.path} className="flex items-center gap-2">
                    {pageData.heroSection.contact_button.text}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Banner */}
      {pageData.reviewBanner && (
        <section className="bg-pest-red py-4">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-white">
              {pageData.reviewBanner.text && <p className="text-center md:text-left mb-2 md:mb-0">{pageData.reviewBanner.text}</p>}
              <div className="flex items-center gap-2">
                {pageData.reviewBanner.rating && (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                {pageData.reviewBanner.google_review_button?.text && pageData.reviewBanner.google_review_button.external_path && (
                  <Link href={pageData.reviewBanner.google_review_button.external_path} target="_blank" className="text-white underline hover:text-white/90">
                    {pageData.reviewBanner.google_review_button.text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      {pageData.mainContentSection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {pageData.mainContentSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{pageData.mainContentSection.heading}</h2>}
              {pageData.mainContentSection.description && <p className="text-lg mb-8 text-center">{pageData.mainContentSection.description}</p>}

              {pageData.mainContentSection.features && pageData.mainContentSection.features.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {pageData.mainContentSection.features.map((feature, index) => (
                    <div key={index} className="bg-gray-light p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        {feature.icon === "Building2" && <Building2 className="h-6 w-6 text-pest-red" />}
                        {feature.icon === "ShieldCheck" && <ShieldCheck className="h-6 w-6 text-pest-red" />}
                        {feature.icon === "Clock" && <Clock className="h-6 w-6 text-pest-red" />}
                        {feature.icon === "Briefcase" && <Briefcase className="h-6 w-6 text-pest-red" />}
                        {feature.title}
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Industries We Serve */}
      {pageData.industriesSection && (
        <section className="py-16 bg-gray-light">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {pageData.industriesSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{pageData.industriesSection.heading}</h2>}
            {pageData.industriesSection.industries && pageData.industriesSection.industries.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageData.industriesSection.industries.map((industry, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48">
                      <Image src={industry.imageUrl || "/placeholder.svg"} alt={industry.title || "Industry"} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                      <p className="mb-4">{industry.description}</p>
                      <Link href="/contact" className="text-pest-red font-medium hover:text-pest-red/80 flex items-center gap-1">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Our Commercial Services */}
      {pageData.servicesSection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {pageData.servicesSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{pageData.servicesSection.heading}</h2>}
            {pageData.servicesSection.services && pageData.servicesSection.services.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pageData.servicesSection.services.map((service, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-6 w-6 text-pest-red" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Our Process */}
      {pageData.processSection && (
        <section className="py-16 bg-gray-light">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {pageData.processSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{pageData.processSection.heading}</h2>}
            {pageData.processSection.steps && pageData.processSection.steps.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pageData.processSection.steps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg relative">
                    <div className="absolute -top-5 -left-5 bg-pest-red text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">{step.number}</div>
                    <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      {pageData.whyChooseUsSection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {pageData.whyChooseUsSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{pageData.whyChooseUsSection.heading}</h2>}
              {pageData.whyChooseUsSection.features && pageData.whyChooseUsSection.features.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {pageData.whyChooseUsSection.features.map((feature, index) => (
                    <div key={index} className="bg-gray-light p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {pageData.whyChooseUsSection.cta_button?.text && pageData.whyChooseUsSection.cta_button.path && (
                <div className="text-center">
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-8 sm:px-8 sm:py-6 text-base sm:text-lg max-w-full md:max-w-max mx-auto whitespace-normal">
                    <Link href={pageData.whyChooseUsSection.cta_button.path} className="flex items-center justify-center md:justify-center py-2 px-3 md:px-4">
                      <span>{pageData.whyChooseUsSection.cta_button.text}</span>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {pageData.testimonialsSection && <TestimonialsSection heading={pageData.testimonialsSection.heading} testimonials={pageData.testimonialsSection.testimonials} button={pageData.testimonialsSection.button} link={pageData.testimonialsSection.link} />}

      {/* Service Areas - using the existing component */}
      <ServiceAreas />

      {/* FAQ Section */}
      {pageData.faqSection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {pageData.faqSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{pageData.faqSection.heading}</h2>}
              {pageData.faqSection.faqs && pageData.faqSection.faqs.length > 0 && (
                <div className="space-y-6">
                  {pageData.faqSection.faqs.map((faq) => (
                    <div key={faq._id} className="bg-gray-light p-6 rounded-lg">
                      {faq.question && <h3 className="text-xl font-bold mb-3">{faq.question}</h3>}
                      {faq.answer &&
                        (typeof faq.answer === "string" ? (
                          <p>{faq.answer}</p>
                        ) : (
                          <div className="prose">
                            <PortableText value={faq.answer} components={portableTextComponents} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - using the existing component*/}
      <CTASection />
    </>
  );
}
