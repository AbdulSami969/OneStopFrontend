import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { getContactPage } from "@/lib/queries/contactPage";
import { Metadata } from "next";

interface BusinessHours {
  day: string;
  hours: string;
}

interface ContactOption {
  optionType: string;
  title: string;
  subtitle: string;
  icon?: string;
  value?: string;
  link?: string;
  businessHours?: BusinessHours[];
}

// Icon mapping function
const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case "phone":
      return <Phone className="h-6 w-6" />;
    case "email":
      return <Mail className="h-6 w-6" />;
    case "serviceArea":
      return <MapPin className="h-6 w-6" />;
    case "businessHours":
      return <Clock className="h-6 w-6" />;
    default:
      return <Phone className="h-6 w-6" />;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us | 1 Stop Pest Control | Albany Capital Region",
    description: "Contact 1 Stop Pest Control for residential and commercial pest control services in the Albany Capital Region. Request a free quote or call us at 518-728-5589.",
  };
}

export default async function ContactPage() {
  // Fetch data from Sanity
  const pageData = await getContactPage();

  // Fallback values for header section
  const headline = pageData?.headerSection?.headline || "Contact Us";
  const subheadline = pageData?.headerSection?.subheadline || "Get in touch with 1 Stop Pest Control for all your pest management needs in the Albany Capital Region";

  // Fallback values for contact info section
  const infoHeadline = pageData?.contactInfoSection?.headline || "Get In Touch";
  const infoDescription = pageData?.contactInfoSection?.description || "Have a pest problem? Need a quote? Or just have a question? We're here to help! Contact 1 Stop Pest Control using any of the methods below or fill out our contact form.";

  // Use Sanity data or fallback for contact options
  const contactOptions: ContactOption[] = pageData?.contactInfoSection?.contactOptions || [
    {
      optionType: "phone",
      title: "Phone",
      subtitle: "Call us directly:",
      value: "518-728-5589",
      link: "tel:5187285589",
    },
    {
      optionType: "email",
      title: "Email",
      subtitle: "Send us an email:",
      value: "info@1stoppestcontrolllc.com",
      link: "mailto:info@1stoppestcontrolllc.com",
    },
    {
      optionType: "serviceArea",
      title: "Service Area",
      subtitle: "We proudly serve:",
      value: "The entire Albany Capital Region",
    },
    {
      optionType: "businessHours",
      title: "Business Hours",
      businessHours: [
        { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
        { day: "Sunday", hours: "Closed" },
      ],
    },
  ];

  // Emergency services
  const emergencyTitle = pageData?.contactInfoSection?.emergencyServices?.title || "Emergency Services";
  const emergencyDescription = pageData?.contactInfoSection?.emergencyServices?.description || "Pest emergency? We offer urgent response services for critical pest situations. Call our emergency line:";
  const emergencyButtonText = pageData?.contactInfoSection?.emergencyServices?.buttonText || "518-728-5589";
  const emergencyButtonLink = pageData?.contactInfoSection?.emergencyServices?.buttonLink || "tel:5187285589";

  // Form section
  const formTitle = pageData?.formSection?.title || "Send Us a Message";

  // Service areas section
  const areasTitle = pageData?.serviceAreasSection?.title || "Areas We Serve";
  const areasDescription = pageData?.serviceAreasSection?.description || "1 Stop Pest Control proudly serves the entire Albany Capital Region, including the following areas:";
  const areas: string[] = pageData?.serviceAreasSection?.areas || ["Albany", "Rensselaer", "Troy", "Schenectady", "Colonie", "Clifton Park", "Latham", "Delmar", "Guilderland", "East Greenbush", "Cohoes", "Watervliet", "Saratoga Springs", "Ballston Spa", "Malta", "Glenville"];
  const areasButtonText = pageData?.serviceAreasSection?.buttonText || "View All Service Areas";
  const areasButtonLink = pageData?.serviceAreasSection?.buttonLink || "/service-areas";

  // CTA section
  const ctaTitle = pageData?.ctaSection?.title || "Ready to Get Started?";
  const ctaDescription = pageData?.ctaSection?.description || "Contact 1 Stop Pest Control today for a free consultation and take the first step towards a pest-free environment.";
  const ctaPrimaryText = pageData?.ctaSection?.primaryButton?.text || "Call 518-728-5589";
  const ctaPrimaryLink = pageData?.ctaSection?.primaryButton?.link || "tel:5187285589";
  const ctaSecondaryText = pageData?.ctaSection?.secondaryButton?.text || "Schedule an Appointment";
  const ctaSecondaryLink = pageData?.ctaSection?.secondaryButton?.link || "/book";

  return (
    <>
      {/* Header Section */}
      <section className="bg-white pt-12 pb-6">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pest-red">{headline}</h1>
            <p className="text-xl text-gray-700 mb-0">{subheadline}</p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl font-bold">{infoHeadline}</h2>
              </div>
              <p className="text-lg mb-8">{infoDescription}</p>

              <div className="space-y-8 mb-8">
                {contactOptions.map((option: ContactOption, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">{getIconComponent(option.optionType)}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{option.title}</h3>
                      <p className="text-gray-600 mb-1">{option.subtitle}</p>

                      {option.optionType === "phone" && (
                        <a href={option.link} className="text-2xl font-bold text-pest-red hover:underline">
                          {option.value}
                        </a>
                      )}

                      {option.optionType === "email" && (
                        <a href={option.link} className="text-lg font-medium text-pest-red hover:underline">
                          {option.value}
                        </a>
                      )}

                      {option.optionType === "serviceArea" && <p className="text-lg">{option.value}</p>}

                      {option.optionType === "businessHours" && option.businessHours && (
                        <div className="grid grid-cols-2 gap-2">
                          {option.businessHours.map((hours: BusinessHours, idx: number) => (
                            <div key={idx}>
                              <p className="font-medium">{hours.day}</p>
                              <p className="text-gray-600">{hours.hours}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{emergencyTitle}</h3>
                <p className="mb-4">{emergencyDescription}</p>
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 w-full">
                  <Link href={emergencyButtonLink} className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>{emergencyButtonText}</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-light p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">{formTitle}</h2>
                <ContactForm formData={pageData?.formSection} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">{areasTitle}</h2>
            <p className="text-lg max-w-3xl mx-auto">{areasDescription}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {areas.map((city: string, index: number) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center hover:bg-pest-red hover:text-white transition-colors">
                {city}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
              <Link href={areasButtonLink} className="flex items-center gap-2">
                <span>{areasButtonText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{ctaTitle}</h2>
            <p className="text-xl mb-8">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
                <Link href={ctaPrimaryLink} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{ctaPrimaryText}</span>
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href={ctaSecondaryLink}>{ctaSecondaryText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
