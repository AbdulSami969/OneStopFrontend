import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bug, ShieldCheck, AlertTriangle, Home, Zap, Clock, CheckCircle, Thermometer } from "lucide-react";
import PestIcon from "@/components/pest-icons";
import { getPest, getAllPestSlugs } from "@/lib/queries/pests";
import { urlForImage } from "@/lib/sanity.image";
import { notFound } from "next/navigation";
import * as Icons from "react-icons/fa";
import * as MdiIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";

// Generate static paths for all pests
export async function generateStaticParams() {
  const slugs = await getAllPestSlugs();
  return slugs.map((slug) => ({
    pests: slug,
  }));
}

interface PestPageParams {
  params: {
    pests: string;
  };
}

export default async function PestPage({ params }: PestPageParams) {
  const pest = await getPest(params.pests);

  if (!pest) {
    notFound();
  }

  if (pest.benefitsSection?.benefits?.[0]?.icon) {
    console.log("Icon format:", pest.benefitsSection.benefits[0].icon);
  }

  // Construct the page title
  const pageTitle = `${pest.name} Control`;

  // Helper function to handle potentially missing data
  const getHeroBackgroundUrl = () => {
    if (pest.heroSection?.heroImage) {
      const imageUrl = urlForImage(pest.heroSection.heroImage);
      return imageUrl ? `url('${imageUrl.url()}')` : "url('/images/default-pest-hero.png')";
    }
    return "url('/images/default-pest-hero.png')";
  };

  // Helper function to get image URL safely
  const getImageUrl = (image: any) => {
    if (!image) return null;
    const imageUrl = urlForImage(image);
    return imageUrl ? imageUrl.url() : null;
  };

  // Helper function to render the correct icon based on type
  const renderIcon = (iconData: any) => {
    if (!iconData) return <Bug className="h-6 w-6 text-pest-red" />;

    // Case 1: String icon name (legacy format)
    if (typeof iconData === "string") {
      switch (iconData) {
        case "Bug":
          return <Bug className="h-6 w-6 text-pest-red" />;
        case "ShieldCheck":
          return <ShieldCheck className="h-6 w-6 text-pest-red" />;
        case "Zap":
          return <Zap className="h-6 w-6 text-pest-red" />;
        case "Clock":
          return <Clock className="h-6 w-6 text-pest-red" />;
        case "CheckCircle":
          return <CheckCircle className="h-6 w-6 text-pest-red" />;
        case "Thermometer":
          return <Thermometer className="h-6 w-6 text-pest-red" />;
        default:
          return <Bug className="h-6 w-6 text-pest-red" />;
      }
    }

    // Case 2: Icon object from iconPicker
    if (iconData._type === "iconPicker") {
      // Handle different icon libraries based on provider
      if (iconData.provider === "mdi") {
        const MdiIcon = (MdiIcons as any)[iconData.name];
        return MdiIcon ? <MdiIcon className="h-6 w-6 text-pest-red" /> : <Bug className="h-6 w-6 text-pest-red" />;
      } else if (iconData.provider === "fa") {
        const FaIcon = (Icons as any)[iconData.name];
        return FaIcon ? <FaIcon className="h-6 w-6 text-pest-red" /> : <Bug className="h-6 w-6 text-pest-red" />;
      } else if (iconData.provider === "hi") {
        const HiIcon = (HiIcons as any)[iconData.name];
        return HiIcon ? <HiIcon className="h-6 w-6 text-pest-red" /> : <Bug className="h-6 w-6 text-pest-red" />;
      } else if (iconData.provider === "fi") {
        const FiIcon = (FiIcons as any)[iconData.name];
        return FiIcon ? <FiIcon className="h-6 w-6 text-pest-red" /> : <Bug className="h-6 w-6 text-pest-red" />;
      }
    }

    // Case 3: React-icons format with HTML
    if (iconData._type === "react-icons" && iconData.icon) {
      return <div className="h-6 w-6 text-pest-red" style={{ color: "var(--pest-red)" }} dangerouslySetInnerHTML={{ __html: iconData.icon }} />;
    }

    // Case 4: Image with asset
    if (iconData.asset) {
      return (
        <div className="w-6 h-6 relative">
          <Image src={getImageUrl(iconData) || ""} alt="Benefit icon" width={24} height={24} className="object-contain" />
        </div>
      );
    }

    // Default fallback
    return <Bug className="h-6 w-6 text-pest-red" />;
  };

  return (
    <>
      <section className="bg-cover bg-center relative pt-32 sm:pt-0 py-16 md:py-24" style={{ backgroundImage: getHeroBackgroundUrl() }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">{pest.icon && getImageUrl(pest.icon) ? <Image src={getImageUrl(pest.icon) || ""} alt={`${pest.name} icon`} width={80} height={80} className="object-contain" /> : <PestIcon type="ant" size={80} />}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pest.heroSection?.headline || pageTitle}</h1>
            <p className="text-xl mb-8">{pest.heroSection?.description || `Effective ${pest.name.toLowerCase()} elimination and prevention for your home or business`}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {pest.benefitsSection && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{pest.benefitsSection.title || `Benefits of Professional ${pest.name} Control`}</h2>
                <p className="text-lg mb-6">{pest.benefitsSection.description || `Professional ${pest.name.toLowerCase()} control provides numerous benefits over DIY methods.`}</p>

                <div className="space-y-4 mb-8">
                  {pest.benefitsSection.benefits &&
                    pest.benefitsSection.benefits.map((benefit: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        {/* Render icon using our helper function */}
                        <div className="flex-shrink-0 mt-1">{renderIcon(benefit.icon)}</div>
                        <div>
                          <h3 className="font-bold text-lg">{benefit.title}</h3>
                          <p>{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {pest.benefitsSection.ctaButton && (
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                    <Link href={pest.benefitsSection.ctaButton.path || "/contact"}>{pest.benefitsSection.ctaButton.text || `Schedule ${pest.name} Control`}</Link>
                  </Button>
                )}
              </div>

              <div className="relative">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  {pest.benefitsSection?.featuredImage && getImageUrl(pest.benefitsSection.featuredImage) ? (
                    <Image src={getImageUrl(pest.benefitsSection.featuredImage) || ""} alt={`${pest.name} control benefits`} fill className="object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Icons.FaShieldAlt className="h-8 w-8 text-white" />
                    <span className="text-xl font-bold">{pest.benefitsSection.imageBadge || "Complete Protection"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {pest.processSection?.steps && pest.processSection.steps.length > 0 && (
        <section className="py-12 md:py-16 bg-wood-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">{pest.processSection.title || `Our ${pest.name} Control Process`}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {pest.processSection.steps
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">{step.stepNumber}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{pest.ctaSection?.title || `Don't Let ${pest.name}s Take Over Your Home`}</h2>
            <p className="text-xl mb-8">{pest.ctaSection?.description || `Our professional ${pest.name.toLowerCase()} control services eliminate existing infestations and prevent future problems. Contact us today for a consultation.`}</p>
            <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
              <Link href={pest.ctaSection?.button?.path || "/contact"}>{pest.ctaSection?.button?.text || "Get a Free Quote"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Health Risks Section - Optional */}
      {pest.healthRisksSection?.risks && pest.healthRisksSection.risks.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">{pest.healthRisksSection.title || `Health Risks from ${pest.name} Infestations`}</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4 list-disc pl-5">
                {pest.healthRisksSection.risks.map((risk, index) => (
                  <li key={index} className="text-lg">
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Prevention Tips Section - Optional */}
      {pest.preventionSection?.tips && pest.preventionSection.tips.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">{pest.preventionSection.title || `${pest.name} Prevention Tips`}</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4 list-disc pl-5">
                {pest.preventionSection.tips.map((tip, index) => (
                  <li key={index} className="text-lg">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
