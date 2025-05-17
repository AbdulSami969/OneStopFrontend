import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Thermometer, Bug, ShieldCheck, Clock, Zap } from "lucide-react";
import { getService, getServices } from "@/lib/queries/services";
import type { Service } from "@/lib/types/services";
import { urlForImage } from "@/lib/sanity.image";
import { PortableText } from "@portabletext/react";
import * as Icons from "react-icons/fa";
import * as MdiIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";

// Helper function to render the correct icon based on type
const renderIcon = (iconData: any) => {
  if (!iconData) return <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;

  // Case 1: String icon name (legacy format)
  if (typeof iconData === "string") {
    switch (iconData) {
      case "Zap":
        return <Zap className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      case "Clock":
        return <Clock className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      case "CheckCircle":
        return <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      case "Bug":
        return <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      case "Thermometer":
        return <Thermometer className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
      default:
        return <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
    }
  }

  // Case 2: Icon object from iconPicker
  if (iconData._type === "iconPicker") {
    // Handle different icon libraries based on provider
    if (iconData.provider === "mdi") {
      const MdiIcon = (MdiIcons as any)[iconData.name];
      return MdiIcon ? <MdiIcon className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" /> : <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
    } else if (iconData.provider === "fa") {
      const FaIcon = (Icons as any)[iconData.name];
      return FaIcon ? <FaIcon className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" /> : <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
    } else if (iconData.provider === "hi") {
      const HiIcon = (HiIcons as any)[iconData.name];
      return HiIcon ? <HiIcon className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" /> : <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
    } else if (iconData.provider === "fi") {
      const FiIcon = (FiIcons as any)[iconData.name];
      return FiIcon ? <FiIcon className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" /> : <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
    }
  }

  // Case 3: React-icons format with HTML
  if (iconData._type === "react-icons" && iconData.icon) {
    return <div className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" style={{ color: "var(--pest-red)" }} dangerouslySetInnerHTML={{ __html: iconData.icon }} />;
  }

  // Case 4: Image with asset
  if (iconData.asset) {
    return (
      <div className="w-6 h-6 relative flex-shrink-0 mt-1">
        <Image src={urlForImage(iconData).toString() || ""} alt="Benefit icon" width={24} height={24} className="object-contain" />
      </div>
    );
  }

  // Default fallback
  return <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />;
};

// export async function generateStaticParams() {
//   const services = await getServices();

//   return services.map((service: Service) => ({
//     slug: service.slug.current,
//   }));
// }

// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   // Make sure params is properly awaited
//   const { slug } = params;
//   console.log("Processing slug:", slug);

//   const service = await getService(slug);

//   if (!service) return { title: "Service Not Found" };

//   return {
//     title: service.seo?.metaTitle || service.title,
//     description: service.seo?.metaDescription || "",
//     openGraph: {
//       images: service.seo?.openGraphImage ? [urlForImage(service.seo.openGraphImage).toString()] : [],
//     },
//   };
// }

export default async function Service({ params }: { params: { slug: string } }) {
  console.log("params", params);
  // const { slug } = params;
  const service = await getService(params.slug);

  if (!service) {
    return (
      <div className="container-custom py-20">
        <h1 className="text-3xl font-bold">Service not found</h1>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{
          backgroundImage: service.heroSection.heroImage ? `url(${urlForImage(service.heroSection.heroImage).toString()})` : "url('/images/default-service.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.heroSection.headline}</h1>
            <p className="text-xl mb-8">{service.heroSection.description}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{service.benefitsSection.title}</h2>
              <p className="text-lg mb-6">{service.benefitsSection.description}</p>

              <div className="space-y-4 mb-8">
                {service.benefitsSection.benefits.map((benefit: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    {renderIcon(benefit.icon)}
                    <div>
                      <h3 className="font-bold text-lg">{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href={service.benefitsSection.ctaButton.path || "/contact"}>{service.benefitsSection.ctaButton.text}</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src={service.benefitsSection.featuredImage ? urlForImage(service.benefitsSection.featuredImage).toString() : "/images/default-featured.png"} alt={service.title} fill className="object-cover" />
              </div>
              {service.benefitsSection.statCallout && (
                <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    {renderIcon(service.benefitsSection.statCallout.icon)}
                    <span className="text-2xl font-bold">{service.benefitsSection.statCallout.statNumber}</span>
                  </div>
                  <p className="text-sm">{service.benefitsSection.statCallout.statDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 bg-gray-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">{service.processSection.title}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {service.processSection.steps.map((step: { stepNumber: number; title: string; description: string }, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">{step.stepNumber}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            {renderIcon(service.ctaSection.icon)}
            <h2 className="text-3xl font-bold mb-6">{service.ctaSection.title}</h2>
            <p className="text-xl mb-8">{service.ctaSection.description}</p>
            <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
              <Link href={service.ctaSection.button.path || "/contact"}>{service.ctaSection.button.text}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
