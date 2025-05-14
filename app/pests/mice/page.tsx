import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bug, ShieldCheck, AlertTriangle, Home } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function MicePage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/rodents.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">
              <PestIcon type="mouse" size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Rodent Control</h1>
            <p className="text-xl mb-8">Effective mice and rat elimination and prevention for your property</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Rodent Identification</h2>
              <p className="text-lg mb-6">
                Mice and rats are destructive pests that can damage property, contaminate food, and spread diseases.
                They reproduce quickly, making a small problem turn into a major infestation if not addressed promptly.
                House mice and Norway rats are the most common rodent pests in the Albany Capital Region.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Signs of Infestation</h3>
                    <p>
                      Droppings, gnaw marks on food packaging or structures, nesting materials (shredded paper, fabric,
                      or insulation), scratching noises in walls or ceilings, and greasy rub marks along baseboards and
                      walls.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Common Species</h3>
                    <p>
                      House mice (small, with large ears and a pointed snout) and Norway rats (larger, with a blunt
                      snout and smaller ears relative to their body).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Our Solution</h3>
                    <p>
                      We use a comprehensive approach that includes exclusion (sealing entry points), trapping, and
                      baiting to eliminate rodents and prevent future infestations.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Rodent Control</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/rodents.png" alt="Mouse Close-up" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8" />
                  <span className="text-xl font-bold">Complete Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-wood-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Rodent Control Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Inspection & Assessment</h3>
              <p>
                Our technicians conduct a thorough inspection to identify rodent species, locate entry points, nesting
                areas, and food sources, and assess the extent of the infestation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusion & Elimination</h3>
              <p>
                We seal entry points as small as a dime (for mice) or a quarter (for rats) and implement a strategic
                combination of trapping and baiting methods to eliminate the existing rodent population.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Sanitation & Prevention</h3>
              <p>
                We provide recommendations for removing food sources and harborage areas, install monitoring stations to
                detect new activity, and offer follow-up services to ensure long-term protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Protect Your Home from Rodents</h2>
            <p className="text-xl mb-8">
              Rodents can cause significant damage to your property and pose health risks to your family. Our
              professional rodent control services provide complete elimination and long-lasting protection.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-pest-red hover:bg-gray-100 border-white"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
