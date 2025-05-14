import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, ArrowRight, Phone } from "lucide-react"
import PestIcon from "@/components/pest-icons"

// Define the pests that 1 Stop Pest Control commonly deals with
const pests = [
  {
    id: "bed-bugs",
    name: "Bed Bugs",
    image: "/images/bedbug-closeup.png",
    icon: "bedbug",
    description:
      "Small, reddish-brown parasitic insects that feed on the blood of sleeping people and animals. They hide in mattresses, bed frames, and cracks in furniture.",
    link: "/pests/bed-bugs",
  },
  {
    id: "ants",
    name: "Ants",
    image: "/images/antcontrol.png",
    icon: "ant",
    description:
      "Social insects that can quickly establish colonies in and around your home. Common species in Albany include carpenter ants, pavement ants, and odorous house ants.",
    link: "/pests/ants",
  },
  {
    id: "cockroaches",
    name: "Cockroaches",
    image: "/images/roaches.png",
    icon: "cockroach",
    description:
      "Resilient pests that can spread disease and trigger allergies. German and American cockroaches are common in the Albany region.",
    link: "/pests/roaches",
  },
  {
    id: "rodents",
    name: "Mice & Rats",
    image: "/images/rodents.png",
    icon: "mouse",
    description:
      "Rodents can damage property, contaminate food, and spread diseases. House mice and Norway rats are prevalent in the Albany Capital Region.",
    link: "/pests/mice",
  },
  {
    id: "spiders",
    name: "Spiders",
    image: "/detailed-spider.png",
    icon: "spider",
    description:
      "While most spiders in the Albany area are harmless, some species can bite and cause discomfort. Common species include house spiders, wolf spiders, and cellar spiders.",
    link: "/pests/spiders",
  },
  {
    id: "wasps",
    name: "Wasps & Hornets",
    image: "/images/wasps.png",
    icon: "wasp",
    description:
      "Stinging insects that can build nests in and around homes. Yellow jackets, paper wasps, and bald-faced hornets are common in the Albany region.",
    link: "/pests/wasps",
  },
  {
    id: "mosquitoes",
    name: "Mosquitoes",
    image: "/mosquito.png",
    icon: "ant",
    description:
      "Blood-feeding insects that can transmit diseases. They breed in standing water and are most active during warm months in the Albany area.",
    link: "/pests/mosquitoes",
  },
  {
    id: "ticks",
    name: "Ticks",
    image: "/tick.png",
    icon: "spider",
    description:
      "Parasitic arachnids that can transmit Lyme disease and other illnesses. Deer ticks and dog ticks are common in the Albany Capital Region.",
    link: "/pests/ticks",
  },
  {
    id: "flies",
    name: "Flies",
    image: "/house-fly.png",
    icon: "ant",
    description:
      "Disease-carrying insects that can contaminate food and surfaces. House flies, fruit flies, and cluster flies are common in Albany homes.",
    link: "/pests/flies",
  },
]

export default function PestLibraryPage() {
  return (
    <>
      {/* Pest Library Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Pest Library</h1>
            <p className="text-xl mb-8">
              Learn about common pests in the Albany Capital Region and how 1 Stop Pest Control can help eliminate them
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>Call for Immediate Assistance: 518-728-5589</span>
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
            <h2 className="text-3xl font-bold mb-6">Common Pests in the Albany Capital Region</h2>
            <p className="text-lg">
              The Albany Capital Region is home to a variety of pests that can invade your home or business. Our pest
              library provides information about these common pests, their habits, and the effective treatment methods
              that 1 Stop Pest Control uses to eliminate them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pests.map((pest) => (
              <Link
                key={pest.id}
                href={pest.link}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64">
                  <Image
                    src={pest.image || "/placeholder.svg"}
                    alt={pest.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                    <PestIcon type={pest.icon as any} size={24} className="text-white" />
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
                <h2 className="text-3xl font-bold">Need Help Identifying a Pest?</h2>
              </div>
              <p className="text-lg mb-6">
                If you're dealing with a pest that you can't identify, our expert technicians can help. We offer free
                pest identification services to residents and businesses in the Albany Capital Region.
              </p>
              <p className="text-lg mb-8">
                Simply take a clear photo of the pest and send it to us, or schedule an inspection, and our trained
                professionals will identify the pest and recommend the most effective treatment options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                  <Link href="/contact">Contact Us for Identification</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-pest-red text-pest-red hover:bg-pest-red/10"
                >
                  <Link href="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/bedbug-closeup.png"
                    alt="Bed Bug Close-up"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/antcontrol.png"
                    alt="Ant Close-up"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/roaches.png"
                    alt="Cockroach Close-up"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/wasps.png"
                    alt="Wasp Close-up"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">Expert Identification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pest Prevention Tips */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Pest Prevention Tips</h2>
            <p className="text-lg max-w-3xl mx-auto">
              While professional pest control is the most effective solution for existing infestations, these prevention
              tips can help keep pests away from your home or business:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-pest-red">Seal Entry Points</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Seal cracks and gaps in your foundation, walls, and around windows and doors</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Install door sweeps and weather stripping</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Repair damaged screens on windows and vents</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-pest-red">Eliminate Food Sources</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Store food in airtight containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Clean up spills and crumbs immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Take out trash regularly and use sealed garbage cans</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Don't leave pet food out overnight</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-pest-red">Reduce Moisture</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Fix leaky pipes and faucets</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Use dehumidifiers in damp areas like basements</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Ensure proper drainage around your foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Remove standing water from gutters and around your property</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
              <Link href="/contact">Schedule a Professional Inspection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Don't Let Pests Take Over Your Home</h2>
            <p className="text-xl mb-8">
              Contact 1 Stop Pest Control today for professional pest control services in the Albany Capital Region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-pest-red hover:bg-gray-100 border-white"
              >
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href="tel:5187285589">Call 518-728-5589</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
