import { getServices } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.image";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Services | 1 Stop Pest Control",
  description: "Professional pest control services for residential and commercial properties in the Albany Capital Region.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-pest-red text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Pest Control Services</h1>
            <p className="text-xl mb-8">Professional pest control solutions tailored to your specific needs. We handle all types of pest infestations with environmentally responsible methods.</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.slug.current} className="bg-gray-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-56">
                  <Image src={service.heroSection?.heroImage ? urlForImage(service.heroSection.heroImage).url() : "/images/default-service.png"} alt={service.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">{service.heroSection?.description || "Professional pest control service tailored to your needs."}</p>
                  <Button asChild className="bg-pest-red hover:bg-pest-red/90 w-full">
                    <Link href={`/services/${service.slug.current}`} className="flex items-center justify-center gap-2">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gray-light">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Need Help With Pest Control?</h2>
            <p className="text-lg mb-8">Contact our team for personalized service and a free consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
