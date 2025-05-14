import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bug, ShieldCheck, AlertTriangle, Droplets } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function RoachesPage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/roaches.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">
              <PestIcon type="cockroach" size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cockroach Control</h1>
            <p className="text-xl mb-8">Effective cockroach elimination to protect your family's health and property</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Cockroach Identification</h2>
              <p className="text-lg mb-6">
                Cockroaches are resilient pests that can spread disease, trigger allergies and asthma, and contaminate
                food. They reproduce quickly and can be difficult to eliminate without professional help. German and
                American cockroaches are the most common species in the Albany Capital Region.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Signs of Infestation</h3>
                    <p>
                      Live cockroaches (especially at night), dark droppings that resemble coffee grounds or pepper, egg
                      casings, and a musty odor in severe infestations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Common Species</h3>
                    <p>
                      German cockroaches (small, light brown with two dark stripes) and American cockroaches (larger,
                      reddish-brown, also called water bugs or palmetto bugs).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Droplets className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Our Solution</h3>
                    <p>
                      We use a combination of targeted treatments, baits, and growth regulators to eliminate cockroaches
                      at all life stages and prevent reinfestation.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Cockroach Treatment</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/roaches.png" alt="Cockroach Close-up" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8" />
                  <span className="text-xl font-bold">Health Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-wood-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Cockroach Control Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Inspection & Identification</h3>
              <p>
                Our technicians thoroughly inspect your property to identify cockroach species, locate harborage areas,
                and determine the extent of the infestation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Treatment</h3>
              <p>
                We implement a multi-faceted approach using baits, dusts, and liquid treatments to target cockroaches at
                all life stages, including eggs, nymphs, and adults.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Prevention & Follow-up</h3>
              <p>
                We seal entry points, provide sanitation recommendations, and conduct follow-up visits to ensure
                complete elimination and prevent future infestations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Protect Your Home from Cockroaches</h2>
            <p className="text-xl mb-8">
              Cockroaches can spread disease and trigger allergies. Our professional cockroach control services
              eliminate these pests and protect your family's health.
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
