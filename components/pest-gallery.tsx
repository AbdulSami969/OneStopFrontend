import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Define props type
type PestGalleryProps = {
  data?: any;
};

export default function PestGallery({ data }: PestGalleryProps = {}) {
  // Use data from Sanity if available, otherwise use default values
  const title = data?.title || "Common Pests We Treat";
  const description = data?.description || "We handle a wide variety of pest problems in the Albany Capital Region. Click on a pest to learn more about our treatment methods.";

  // Default pests data if no Sanity data available
  const defaultPests = [
    {
      name: "Bed Bugs",
      image: "/images/bedbugs.png",
      link: "/pests/bed-bugs",
    },
    {
      name: "Ants",
      image: "/images/antsclosepng.png",
      link: "/pests/ants",
    },
    {
      name: "Roaches",
      image: "/images/roaches.png",
      link: "/pests/roaches",
    },
    {
      name: "Mice",
      image: "/images/rodent.png",
      link: "/pests/mice",
    },
    {
      name: "Spiders",
      image: "/images/pest-icons/spider.png",
      link: "/pests/spiders",
    },
    {
      name: "Wasps",
      image: "/images/wasps.png",
      link: "/pests/wasps",
    },
  ];

  // Map Sanity pests data to component format if available
  const pests = data?.pests?.length
    ? data.pests.map((pest: any) => ({
        name: pest.name,
        image: pest.benefitsSection?.featuredImageUrl || "/images/pest-icons/default.png",
        link: `/pest-library/${pest.slug.current}`,
      }))
    : defaultPests;

  return (
    <section className="py-10 md:py-16 bg-gray-medium/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">{title}</h2>
        <p className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">{description}</p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {pests.map((pest: any, index: number) => (
            <Link href={pest.link} key={index} className="group w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(16.666%-0.833rem)]">
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="relative h-32 md:h-40 w-full">
                  <Image src={pest.image || "/placeholder.svg"} alt={`Close-up image of ${pest.name.toLowerCase()}`} width={200} height={200} className="object-contain w-full h-full" />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-medium text-sm md:text-base group-hover:text-pest-red transition-colors">{pest.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
