import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Star, Phone, ArrowRight } from "lucide-react";
import { getServiceAreasPage } from "@/lib/queries/serviceAreasPage";
import { Metadata } from "next";

// Define types for our service areas data
interface ServiceArea {
  county: string;
  cities: string[];
}

interface ButtonData {
  text: string;
  link: string;
}

interface ContactCallout {
  heading: string;
  description: string;
  primaryButton: ButtonData;
  secondaryButton: ButtonData;
}

interface OverlayBox {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// Fallback areas if Sanity data is unavailable
const fallbackServiceAreas: ServiceArea[] = [
  {
    county: "Albany County",
    cities: ["Albany", "Colonie", "Guilderland", "Bethlehem", "New Scotland", "Cohoes", "Watervliet", "Green Island"],
  },
  {
    county: "Rensselaer County",
    cities: ["Troy", "East Greenbush", "North Greenbush", "Rensselaer", "Brunswick", "Schodack", "Poestenkill", "Nassau"],
  },
  {
    county: "Schenectady County",
    cities: ["Schenectady", "Niskayuna", "Rotterdam", "Glenville", "Scotia", "Duanesburg", "Princetown"],
  },
  {
    county: "Saratoga County",
    cities: ["Saratoga Springs", "Clifton Park", "Halfmoon", "Malta", "Ballston Spa", "Wilton", "Mechanicville", "Waterford"],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServiceAreasPage();

  if (!pageData) {
    return {
      title: "Service Areas | 1 Stop Pest Control",
      description: "Pest control services for the Albany Capital Region",
    };
  }

  return {
    title: pageData.seo?.metaTitle || "Service Areas | 1 Stop Pest Control",
    description: pageData.seo?.metaDescription || "Pest control services for the Albany Capital Region",
    openGraph: pageData.seo?.openGraphImageUrl
      ? {
          images: [pageData.seo.openGraphImageUrl],
        }
      : undefined,
  };
}

export default async function ServiceAreasPage() {
  const pageData = await getServiceAreasPage();

  // Fallback values
  const heroHeadline = pageData?.heroSection?.headline || "Areas We Serve";
  const heroSubheadline = pageData?.heroSection?.subheadline || "SERVING THE ALBANY CAPITAL REGION SINCE 2018";
  const heroBackgroundUrl = pageData?.heroSection?.backgroundImageUrl || "/albany-ny-skyline.png";

  const reviewBannerText = pageData?.reviewBanner?.text || "1 Stop Pest Control received an average rating of 4.8 out of 5 stars from our customers.";
  const reviewRating = pageData?.reviewBanner?.rating || 4.8;
  const reviewButtonText = pageData?.reviewBanner?.google_review_button?.text || "Read Google Reviews";
  const reviewButtonLink = pageData?.reviewBanner?.google_review_button?.external_path || "/testimonials";

  const mainHeading = pageData?.mainContentSection?.heading || "WHERE WE SERVICE";
  const mainSubheading = pageData?.mainContentSection?.subheading || "PROFESSIONAL PEST SERVICES FOR THE ALBANY CAPITAL REGION & SURROUNDING AREAS";
  const mainDescription = pageData?.mainContentSection?.description || "Serving the Albany Capital Region since 2018, 1 Stop Pest Control provides complete home pest control, as well as commercial pest control solutions to our customers. If you have pest control needs, please consult the list below to see if we work in your area, then contact us. If your community is not listed below, contact us to see if we can still be of assistance.";

  const serviceAreas: ServiceArea[] = pageData?.mainContentSection?.serviceAreas || fallbackServiceAreas;

  const calloutHeading = pageData?.mainContentSection?.contactCallout?.heading || "Don't see your area listed?";
  const calloutDescription = pageData?.mainContentSection?.contactCallout?.description || "We may still be able to service your location. Contact us to inquire about service availability in your area.";
  const calloutPrimaryBtnText = pageData?.mainContentSection?.contactCallout?.primaryButton?.text || "Contact Us";
  const calloutPrimaryBtnLink = pageData?.mainContentSection?.contactCallout?.primaryButton?.link || "/contact";
  const calloutSecondaryBtnText = pageData?.mainContentSection?.contactCallout?.secondaryButton?.text || "518-728-5589";
  const calloutSecondaryBtnLink = pageData?.mainContentSection?.contactCallout?.secondaryButton?.link || "tel:5187285589";

  const mapHeading = pageData?.mapSection?.heading || "Our Service Area";
  const mapImageUrl = pageData?.mapSection?.mapImageUrl || "/albany-ny-skyline.png";
  const mapOverlayHeading = pageData?.mapSection?.overlayBox?.heading || "Albany Capital Region";
  const mapOverlayDescription = pageData?.mapSection?.overlayBox?.description || "We proudly serve Albany, Rensselaer, Schenectady, and Saratoga counties, covering a 30-mile radius from our base in Rensselaer.";
  const mapOverlayBtnText = pageData?.mapSection?.overlayBox?.buttonText || "Schedule Service";
  const mapOverlayBtnLink = pageData?.mapSection?.overlayBox?.buttonLink || "/contact";

  const ctaHeading = pageData?.ctaSection?.heading || "Ready to Get Started?";
  const ctaDescription = pageData?.ctaSection?.description || "Contact 1 Stop Pest Control today for a free consultation and take the first step towards a pest-free environment.";
  const ctaPrimaryBtnText = pageData?.ctaSection?.primaryButton?.text || "Get a Free Quote";
  const ctaPrimaryBtnLink = pageData?.ctaSection?.primaryButton?.link || "/contact";
  const ctaSecondaryBtnText = pageData?.ctaSection?.secondaryButton?.text || "Call 518-728-5589";
  const ctaSecondaryBtnLink = pageData?.ctaSection?.secondaryButton?.link || "tel:5187285589";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-cover bg-center relative py-16 md:py-24" style={{ backgroundImage: `url('${heroBackgroundUrl}')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroHeadline}</h1>
            <p className="text-xl mb-8">{heroSubheadline}</p>
          </div>
        </div>
      </section>

      {/* Review Banner */}
      <div className="bg-pest-red text-white py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <span>{reviewBannerText}</span>
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className={`h-5 w-5 ${index < Math.floor(reviewRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <Link href={reviewButtonLink} className="ml-2 underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                {reviewButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-pest-red">{mainHeading}</h2>
            <h3 className="text-xl md:text-2xl font-bold mb-12 text-center">{mainSubheading}</h3>

            <p className="text-lg mb-8">{mainDescription}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {serviceAreas.map((area: ServiceArea, index: number) => (
                <div key={index} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-pest-red mr-2" />
                    {area.county}
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {area.cities.map((city: string, cityIndex: number) => (
                      <li key={cityIndex} className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-pest-red mr-2" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gray-light p-8 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">{calloutHeading}</h3>
              <p className="mb-6">{calloutDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                  <Link href={calloutPrimaryBtnLink}>{calloutPrimaryBtnText}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-pest-red text-pest-red hover:bg-pest-red/10">
                  <Link href={calloutSecondaryBtnLink} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{calloutSecondaryBtnText}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{mapHeading}</h2>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src={mapImageUrl} alt="Albany Capital Region Map" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 p-6 rounded-lg max-w-md text-center">
                  <h3 className="text-xl font-bold mb-2">{mapOverlayHeading}</h3>
                  <p className="mb-4">{mapOverlayDescription}</p>
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                    <Link href={mapOverlayBtnLink}>{mapOverlayBtnText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{ctaHeading}</h2>
            <p className="text-xl mb-8">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
                <Link href={ctaPrimaryBtnLink}>{ctaPrimaryBtnText}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href={ctaSecondaryBtnLink}>{ctaSecondaryBtnText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
