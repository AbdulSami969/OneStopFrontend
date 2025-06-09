import { Building, Home, Thermometer, Clock, BugOff, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

// Define props type
type ServicesProps = {
  data?: any;
};

export default function Services({ data }: ServicesProps = {}) {
  // Use data from Sanity if available, otherwise use default data
  const title = data?.title || "Our Services";
  const description = data?.description || "1 Stop Pest Control offers comprehensive pest management solutions for both residential and commercial properties in the Albany Capital Region.";

  // If we have services from Sanity, use those
  const servicesData = data?.services || [
    {
      title: "Heat Treatment",
      description: "Our specialty! Eco-friendly bedbug elimination using advanced heat treatment technology.",
      icon: Thermometer,
      image: "/images/heat-treatment.png",
      link: "/residential",
    },
    {
      title: "Residential Pest Control",
      description: "Comprehensive pest management solutions for your home.",
      icon: Home,
      image: "/images/residential-service.png",
      link: "/residential",
    },
    {
      title: "Commercial Pest Control",
      description: "Tailored pest control programs for businesses of all sizes.",
      icon: Building,
      image: "/images/commercial-service.png",
      link: "/commercial",
    },
    {
      title: "Emergency Services",
      description: "Fast response for urgent pest problems.",
      icon: Clock,
      link: "/emergency",
    },
    {
      title: "Pest Identification",
      description: "Expert identification and targeted treatment plans.",
      icon: BugOff,
      link: "/pest-identification",
    },
    {
      title: "Preventative Programs",
      description: "Ongoing protection to keep pests away year-round.",
      icon: Shield,
      link: "/preventative-programs",
    },
  ];

  // Map Sanity services to component format if available
  const services = data?.services?.length
    ? data.services.map((service: any) => ({
        title: service.title,
        description: service.heroSection?.description || "",
        image: service.imageUrl,
        link: `/services/${service.slug?.current}`,
        icon: getIconByTitle(service.title),
      }))
    : servicesData;

  // Helper function to get an icon based on service title
  function getIconByTitle(title: string) {
    if (title.toLowerCase().includes("heat")) return Thermometer;
    if (title.toLowerCase().includes("residential")) return Home;
    if (title.toLowerCase().includes("commercial")) return Building;
    if (title.toLowerCase().includes("emergency")) return Clock;
    if (title.toLowerCase().includes("identification")) return BugOff;
    if (title.toLowerCase().includes("prevent")) return Shield;
    return BugOff; // Default icon
  }
  console.log(services);
  return (
    <section className="py-10 md:py-16 bg-gray-light relative">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <div className="h-40 w-40 md:h-64 md:w-64">
          <Image src="/images/1stop-logo.png" alt="1 Stop Pest Control LLC" width={300} height={300} className="h-full w-full object-contain" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <div className="h-0.5 bg-pest-red w-8 md:w-12 mr-3 md:mr-4"></div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">{title}</h2>
          <div className="h-0.5 bg-pest-red w-8 md:w-12 ml-3 md:ml-4"></div>
        </div>

        <p className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service: any, index: number) => {
            const ServiceIcon = service.icon;
            const isPrevProgram = service.title === "Preventative Programs";

            return (
              <Link href={service.link === "/services/residential-pest-control" ? "services" : service.link === "/services/commercial-pest-control" ? "commercial" : service.link === "/services/pest-identification" ? "pest-library" : `${service.link}`} key={`service-${index}`} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-pest-red overflow-hidden bg-white">
                  {service.image ? (
                    <div className="relative h-48 md:h-56 w-full overflow-hidden">
                      <Image src={service.image || "/placeholder.svg"} alt={service.title} width={400} height={300} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw" loading={index < 2 ? "eager" : "lazy"} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 bg-pest-red text-white p-2 rounded-full">
                        <ServiceIcon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 md:h-40 bg-gray-100 flex items-center justify-center">
                      <ServiceIcon className={isPrevProgram ? "h-12 w-12 md:h-16 md:w-16 text-pink-300" : "h-12 w-12 md:h-16 md:w-16 text-pest-red/20"} />
                    </div>
                  )}
                  <CardHeader className="pb-1 md:pb-2 pt-4 md:pt-6">
                    <CardTitle className="text-lg md:text-xl group-hover:text-pest-red transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm md:text-base">{service.description}</CardDescription>
                    <div className="mt-3 md:mt-4 text-pest-red font-medium group-hover:translate-x-2 transition-transform duration-300">Learn More →</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
