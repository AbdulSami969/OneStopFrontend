import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Shield, Check, Bug, Calendar, Phone, ArrowRight, Home } from "lucide-react";
import PestIcon from "@/components/pest-icons";
import { urlForImage } from "@/lib/sanity.image";
import { client } from "@/lib/sanity.client";
import { servicesMainPageQuery } from "@/lib/queries/servicesMainPage";
import { PortableText, PortableTextComponents } from "@portabletext/react";

interface ServiceReference {
  _id: string;
  title: string;
  slug: { current: string };
  heroSection?: {
    heroImageUrl?: string;
    description?: string;
  };
}

interface TestimonialReference {
  _id: string;
  name?: string;
  testimonial?: string;
  company?: string;
  imageUrl?: string;
  rating?: number;
}

interface FaqReference {
  _id: string;
  question?: string;
  answer?: any;
}

interface ServicesMainPageData {
  _id: string;
  title: string;
  heroSection?: {
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
  introSection?: {
    heading?: string;
    content?: any[];
    imageUrl?: string;
    contact_button?: { text?: string; path?: string };
    calloutText?: string;
  };
  servicesSection?: {
    heading?: string;
    description?: string;
    services?: ServiceReference[];
  };
  processSection?: {
    heading?: string;
    description?: string;
    steps?: {
      title?: string;
      description?: string;
      features?: string[];
    }[];
  };
  testimonialsSection?: {
    heading?: string;
    testimonials?: TestimonialReference[];
  };
  serviceAreasSection?: {
    heading?: string;
    description?: string;
    areas?: string[];
    contact_button?: { text?: string; path?: string };
    imageUrl?: string;
    calloutText?: string;
  };
  faqSection?: {
    heading?: string;
    description?: string;
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

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-lg">{children}</p>,
  },
};

const RenderStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />
      ))}
    </div>
  );
};

export async function generateMetadata() {
  const pageData: ServicesMainPageData = await client.fetch(servicesMainPageQuery);
  return {
    title: pageData?.title || "Our Services | 1 Stop Pest Control",
    description: pageData?.introSection?.content
      ? pageData.introSection.content
          .map((block: any) => block.children?.map((span: any) => span.text).join(""))
          .join(" ")
          .substring(0, 160)
      : "Professional pest control services for residential and commercial properties in the Albany Capital Region.",
  };
}

export default async function ServicesPage() {
  const pageData: ServicesMainPageData = await client.fetch(servicesMainPageQuery);

  if (!pageData) {
    return <div className="container-custom py-12 text-center">Failed to load page data. Please try again later.</div>;
  }

  return (
    <>
      {/* Hero Section */}
      {pageData.heroSection && (
        <section className="bg-cover bg-center relative py-24 md:py-32" style={{ backgroundImage: pageData.heroSection.backgroundImageUrl ? `url(${pageData.heroSection.backgroundImageUrl})` : "url('/images/residential-hero.png')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              {pageData.heroSection.heading && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{pageData.heroSection.heading}</h1>}
              {pageData.heroSection.subheading && <p className="text-xl md:text-2xl font-bold mb-4">{pageData.heroSection.subheading}</p>}
              {pageData.heroSection.description && <p className="text-lg md:text-xl mb-8">{pageData.heroSection.description}</p>}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {pageData.heroSection.scheduleButton?.text && pageData.heroSection.scheduleButton.path && (
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-6 text-lg">
                    <Link href={pageData.heroSection.scheduleButton.path} className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{pageData.heroSection.scheduleButton.text}</span>
                    </Link>
                  </Button>
                )}
                {pageData.heroSection.contact_button?.text && pageData.heroSection.contact_button.path && (
                  <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white rounded-full px-8 py-6 text-lg">
                    <Link href={pageData.heroSection.contact_button.path} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      <span>{pageData.heroSection.contact_button.text}</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Review Banner */}
      {pageData.reviewBanner && (
        <div className="bg-pest-red text-white py-4">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
              {pageData.reviewBanner.text && <span>{pageData.reviewBanner.text}</span>}
              <div className="flex items-center">
                {pageData.reviewBanner.rating && <RenderStars rating={pageData.reviewBanner.rating} />}
                {pageData.reviewBanner.google_review_button?.text && pageData.reviewBanner.google_review_button.external_path && (
                  <Link href={pageData.reviewBanner.google_review_button.external_path} className="ml-2 underline hover:no-underline">
                    {pageData.reviewBanner.google_review_button.text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Introduction Section */}
      {pageData.introSection && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {pageData.introSection.heading && (
                  <div className="flex items-center mb-4">
                    <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                    <h2 className="text-3xl md:text-4xl font-bold">{pageData.introSection.heading}</h2>
                  </div>
                )}
                {pageData.introSection.content && (
                  <div className="prose lg:prose-xl mb-8">
                    <PortableText value={pageData.introSection.content} components={portableTextComponents} />
                  </div>
                )}
                {pageData.introSection.contact_button?.text && pageData.introSection.contact_button.path && (
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                    <Link href={pageData.introSection.contact_button.path}>{pageData.introSection.contact_button.text}</Link>
                  </Button>
                )}
              </div>
              {pageData.introSection.imageUrl && (
                <div className="relative">
                  <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                    <Image src={pageData.introSection.imageUrl} alt={pageData.introSection.heading || "Introduction Image"} fill className="object-cover" />
                  </div>
                  {pageData.introSection.calloutText && (
                    <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                      <p className="font-bold text-xl">{pageData.introSection.calloutText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Section - Dynamic from Sanity */}
      {pageData.servicesSection && (
        <section className="py-16 bg-gray-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              {pageData.servicesSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData.servicesSection.heading}</h2>}
              {pageData.servicesSection.description && <p className="text-lg max-w-3xl mx-auto">{pageData.servicesSection.description}</p>}
            </div>

            {pageData.servicesSection.services && pageData.servicesSection.services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageData.servicesSection.services.map((service) => (
                  <div key={service.slug.current} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <div className="relative h-64">
                      <Image src={service.heroSection?.heroImageUrl || "/images/default-service.png"} alt={service.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                        <Bug className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">{service.heroSection?.description || "Professional pest control service tailored to your needs."}</p>
                      <Link href={`/services/${service.slug.current}`} className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No services found.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Our Process Section */}
      {pageData.processSection && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              {pageData.processSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData.processSection.heading}</h2>}
              {pageData.processSection.description && <p className="text-lg max-w-3xl mx-auto">{pageData.processSection.description}</p>}
            </div>

            {pageData.processSection.steps && pageData.processSection.steps.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pageData.processSection.steps.map((step, index) => (
                  <div key={index} className="bg-gray-light p-6 rounded-lg relative">
                    <div className="absolute -top-5 -left-5 bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">{index + 1}</div>
                    {step.title && <h3 className="text-xl font-bold mb-4 mt-4">{step.title}</h3>}
                    {step.description && <p className="text-gray-700 mb-4">{step.description}</p>}
                    {step.features && step.features.length > 0 && (
                      <ul className="space-y-2">
                        {step.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {pageData.testimonialsSection && (
        <section className="py-16 bg-gray-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              {pageData.testimonialsSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData.testimonialsSection.heading}</h2>}
              <div className="flex justify-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {pageData.testimonialsSection.testimonials && pageData.testimonialsSection.testimonials.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {pageData.testimonialsSection.testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-md relative">
                    <div className="absolute -top-4 -right-4 text-pest-red opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                    {/* {testimonial} */}
                    {testimonial.rating && <RenderStars rating={testimonial.rating} />}
                    {testimonial.testimonial && <p className="italic my-4">{testimonial.testimonial}</p>}
                    <div className="flex items-center gap-3">
                      {testimonial.imageUrl && (
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border-2 border-pest-red">
                          <Image src={testimonial.imageUrl} alt={testimonial.name || "Customer"} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        {testimonial.name && <p className="font-medium">{testimonial.name}</p>}
                        {testimonial.company && <p className="text-sm text-gray-600">{testimonial.company}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No testimonials to display at this time.</p>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
                <Link href="/testimonials">View All Testimonials</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Service Areas Section */}
      {pageData.serviceAreasSection && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {pageData.serviceAreasSection.heading && (
                  <div className="flex items-center mb-4">
                    <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                    <h2 className="text-3xl md:text-4xl font-bold">{pageData.serviceAreasSection.heading}</h2>
                  </div>
                )}
                {pageData.serviceAreasSection.description && <p className="text-lg mb-6">{pageData.serviceAreasSection.description}</p>}

                {pageData.serviceAreasSection.areas && pageData.serviceAreasSection.areas.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {pageData.serviceAreasSection.areas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-pest-red" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                )}

                {pageData.serviceAreasSection.contact_button?.text && pageData.serviceAreasSection.contact_button.path && (
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                    <Link href={pageData.serviceAreasSection.contact_button.path}>{pageData.serviceAreasSection.contact_button.text}</Link>
                  </Button>
                )}
              </div>

              {pageData.serviceAreasSection.imageUrl && (
                <div className="relative">
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <Image src={pageData.serviceAreasSection.imageUrl} alt={pageData.serviceAreasSection.heading || "Service Area"} fill className="object-cover" />
                  </div>
                  {pageData.serviceAreasSection.calloutText && (
                    <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                      <p className="font-bold text-xl">{pageData.serviceAreasSection.calloutText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {pageData.faqSection && (
        <section className="py-16 bg-gray-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              {pageData.faqSection.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData.faqSection.heading}</h2>}
              {pageData.faqSection.description && <p className="text-lg max-w-3xl mx-auto">{pageData.faqSection.description}</p>}
            </div>

            {pageData.faqSection.faqs && pageData.faqSection.faqs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {pageData.faqSection.faqs.map((faq) => (
                  <div key={faq._id} className="bg-white p-6 rounded-lg shadow-md">
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
            ) : (
              <p className="text-center">No FAQs to display at this time.</p>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {pageData.ctaSection && (
        <section className="py-16 bg-pest-red text-white">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              {pageData.ctaSection.heading && <h2 className="text-3xl font-bold mb-6">{pageData.ctaSection.heading}</h2>}
              {pageData.ctaSection.description && <p className="text-xl mb-8">{pageData.ctaSection.description}</p>}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {pageData.ctaSection.primaryButtonText && pageData.ctaSection.primaryButtonLink && (
                  <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
                    <Link href={pageData.ctaSection.primaryButtonLink}>{pageData.ctaSection.primaryButtonText}</Link>
                  </Button>
                )}
                {pageData.ctaSection.secondaryButtonText && pageData.ctaSection.secondaryButtonLink && (
                  <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                    <Link href={pageData.ctaSection.secondaryButtonLink}>{pageData.ctaSection.secondaryButtonText}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
