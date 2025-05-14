import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const pests = [
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

export default function PestGallery() {
  return (
    <section className="py-10 md:py-16 bg-gray-medium/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">Common Pests We Treat</h2>
        <p className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto">We handle a wide variety of pest problems in the Albany Capital Region. Click on a pest to learn more about our treatment methods.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {pests.map((pest, index) => (
            <Link href={pest.link} key={index} className="group">
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="relative h-32 md:h-40 w-full">
                  <Image
                    src={pest.image || "/placeholder.svg"}
                    alt={`Close-up image of ${pest.name.toLowerCase()}`}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                    // sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                    // loading={index < 3 ? "eager" : "lazy"}
                    // onError={(e) => {
                    //   // Fallback to placeholder if image fails to load
                    //   const target = e.target as HTMLImageElement
                    //   target.src = `/placeholder.svg?height=200&width=200&text=${pest.name}`
                    // }}
                  />
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
