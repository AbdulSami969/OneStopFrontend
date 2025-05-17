import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Info, ArrowRight, Phone } from "lucide-react";
import PestIcon from "@/components/pest-icons";
import { client } from "@/lib/sanity.client";
import { pestLibraryQuery, pestsQuery } from "@/lib/queries/pestLibrary";
import { getPestIconTypeFromUrl } from "@/lib/utils";

// Define types for the pest data
interface Pest {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  link: string;
}

// Define types for prevention tips
interface TipCategory {
  title: string;
  tips: string[];
}

// Define fallback data in case the CMS data is not available
const fallbackPests: Pest[] = [
  {
    id: "bed-bugs",
    name: "Bed Bugs",
    image: "/images/bedbug-closeup.png",
    icon: "bedbug",
    description: "Small, reddish-brown parasitic insects that feed on the blood of sleeping people and animals. They hide in mattresses, bed frames, and cracks in furniture.",
    link: "/pests/bed-bugs",
  },
  {
    id: "ants",
    name: "Ants",
    image: "/images/antcontrol.png",
    icon: "ant",
    description: "Social insects that can quickly establish colonies in and around your home. Common species in Albany include carpenter ants, pavement ants, and odorous house ants.",
    link: "/pests/ants",
  },
  {
    id: "cockroaches",
    name: "Cockroaches",
    image: "/images/roaches.png",
    icon: "cockroach",
    description: "Resilient pests that can spread disease and trigger allergies. German and American cockroaches are common in the Albany region.",
    link: "/pests/roaches",
  },
  {
    id: "rodents",
    name: "Mice & Rats",
    image: "/images/rodents.png",
    icon: "mouse",
    description: "Rodents can damage property, contaminate food, and spread diseases. House mice and Norway rats are prevalent in the Albany Capital Region.",
    link: "/pests/mice",
  },
  {
    id: "spiders",
    name: "Spiders",
    image: "/detailed-spider.png",
    icon: "spider",
    description: "While most spiders in the Albany area are harmless, some species can bite and cause discomfort. Common species include house spiders, wolf spiders, and cellar spiders.",
    link: "/pests/spiders",
  },
  {
    id: "wasps",
    name: "Wasps & Hornets",
    image: "/images/wasps.png",
    icon: "wasp",
    description: "Stinging insects that can build nests in and around homes. Yellow jackets, paper wasps, and bald-faced hornets are common in the Albany region.",
    link: "/pests/wasps",
  },
  {
    id: "mosquitoes",
    name: "Mosquitoes",
    image: "/mosquito.png",
    icon: "ant",
    description: "Blood-feeding insects that can transmit diseases. They breed in standing water and are most active during warm months in the Albany area.",
    link: "/pests/mosquitoes",
  },
  {
    id: "ticks",
    name: "Ticks",
    image: "/tick.png",
    icon: "spider",
    description: "Parasitic arachnids that can transmit Lyme disease and other illnesses. Deer ticks and dog ticks are common in the Albany Capital Region.",
    link: "/pests/ticks",
  },
  {
    id: "flies",
    name: "Flies",
    image: "/house-fly.png",
    icon: "ant",
    description: "Disease-carrying insects that can contaminate food and surfaces. House flies, fruit flies, and cluster flies are common in Albany homes.",
    link: "/pests/flies",
  },
];

export default async function PestLibraryPage() {
  // Fetch data from Sanity
  const pageData = await client.fetch(pestLibraryQuery);
  const pestsData = pageData?.pestGridSection?.pests || (await client.fetch(pestsQuery));

  // Transform Sanity data for the frontend
  console.log(pestsData[0].icon);
  const pests: Pest[] =
    pestsData?.length > 0
      ? pestsData.map((pest: any) => ({
          id: pest._id,
          name: pest.name,
          image: pest.benefitsSection?.featuredImageUrl || "/placeholder.svg",
          icon: pest.icon,
          description: pest.heroSection?.description || "",
          link: `/pest-library/${pest.slug}`,
        }))
      : fallbackPests;

  const identificationGalleryImages: string[] = pageData?.identificationSection?.galleryImages || ["/images/bedbug-closeup.png", "/images/antcontrol.png", "/images/roaches.png", "/images/wasps.png"];

  const preventionTips: TipCategory[] = pageData?.preventionSection?.tipCategories || [
    {
      title: "Seal Entry Points",
      tips: ["Seal cracks and gaps in your foundation, walls, and around windows and doors", "Install door sweeps and weather stripping", "Repair damaged screens on windows and vents"],
    },
    {
      title: "Eliminate Food Sources",
      tips: ["Store food in airtight containers", "Clean up spills and crumbs immediately", "Take out trash regularly and use sealed garbage cans", "Don't leave pet food out overnight"],
    },
    {
      title: "Reduce Moisture",
      tips: ["Fix leaky pipes and faucets", "Use dehumidifiers in damp areas like basements", "Ensure proper drainage around your foundation", "Remove standing water from gutters and around your property"],
    },
  ];

  return (
    <>
      {/* Pest Library Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData?.heroSection?.heading || "Pest Library"}</h1>
            <p className="text-xl mb-8">{pageData?.heroSection?.description || "Learn about common pests in the Albany Capital Region and how 1 Stop Pest Control can help eliminate them"}</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href={pageData?.heroSection?.phoneButton?.path || "/contact"} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>{pageData?.heroSection?.phoneButton?.text || "Call for Immediate Assistance: 518-728-5589"}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pest Grid */}
      <section className="py-12 bg-gray-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">{pageData?.pestGridSection?.heading || "Common Pests in the Albany Capital Region"}</h2>
            <p className="text-lg">{pageData?.pestGridSection?.description || "The Albany Capital Region is home to a variety of pests that can invade your home or business. Our pest library provides information about these common pests, their habits, and the effective treatment methods that 1 Stop Pest Control uses to eliminate them."}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pests.map((pest) => (
              <Link key={pest.id} href={`${pest.link}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative h-64">
                  <Image src={pest.image || "/placeholder.svg"} alt={pest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                    <Image src={`${pest.icon}`} alt={`${pest.name} icon`} width={24} height={24} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-pest-red transition-colors">{pest.name}</h3>
                  <p className="text-gray-700 mb-4">{pest.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Info className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pest Identification Help */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl font-bold">{pageData?.identificationSection?.heading || "Need Help Identifying a Pest?"}</h2>
              </div>
              {pageData?.identificationSection?.description ? (
                <div
                  className="text-lg mb-8"
                  dangerouslySetInnerHTML={{
                    __html: Array.isArray(pageData.identificationSection.description) ? pageData.identificationSection.description.map((block: any) => block.children.map((child: any) => child.text).join("")).join("<br /><br />") : pageData.identificationSection.description,
                  }}
                />
              ) : (
                <>
                  <p className="text-lg mb-6">If you're dealing with a pest that you can't identify, our expert technicians can help. We offer free pest identification services to residents and businesses in the Albany Capital Region.</p>
                  <p className="text-lg mb-8">Simply take a clear photo of the pest and send it to us, or schedule an inspection, and our trained professionals will identify the pest and recommend the most effective treatment options.</p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                  <Link href={pageData?.identificationSection?.primaryButton?.path || "/contact"}>{pageData?.identificationSection?.primaryButton?.text || "Contact Us for Identification"}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-pest-red text-pest-red hover:bg-pest-red/10">
                  <Link href={pageData?.identificationSection?.secondaryButton?.path || "/services"}>{pageData?.identificationSection?.secondaryButton?.text || "View Our Services"}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {identificationGalleryImages.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image src={image} alt={`Pest identification image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">{pageData?.identificationSection?.badgeText || "Expert Identification"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pest Prevention Tips */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">{pageData?.preventionSection?.heading || "Pest Prevention Tips"}</h2>
            <p className="text-lg max-w-3xl mx-auto">{pageData?.preventionSection?.description || "While professional pest control is the most effective solution for existing infestations, these prevention tips can help keep pests away from your home or business:"}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {preventionTips.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-pest-red">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
              <Link href={pageData?.preventionSection?.ctaButton?.path || "/contact"}>{pageData?.preventionSection?.ctaButton?.text || "Schedule a Professional Inspection"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{pageData?.ctaSection?.heading || "Don't Let Pests Take Over Your Home"}</h2>
            <p className="text-xl mb-8">{pageData?.ctaSection?.description || "Contact 1 Stop Pest Control today for professional pest control services in the Albany Capital Region."}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
                <Link href={pageData?.ctaSection?.primaryButton?.path || "/contact"}>{pageData?.ctaSection?.primaryButton?.text || "Get a Free Quote"}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href={pageData?.ctaSection?.secondaryButton?.path || "tel:5187285589"}>{pageData?.ctaSection?.secondaryButton?.text || "Call 518-728-5589"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
