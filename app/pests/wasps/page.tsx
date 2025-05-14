import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bug, ShieldCheck, AlertTriangle, Home } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function WaspsPage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/wasps.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">
              <PestIcon type="wasp" size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Wasp & Hornet Control</h1>
            <p className="text-xl mb-8">Safe and effective removal of stinging insects from your property</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Wasp & Hornet Identification</h2>
              <p className="text-lg mb-6">
                Wasps, hornets, and yellow jackets are stinging insects that can build nests in and around homes. While
                they play a beneficial role in controlling other insects, their aggressive defense of their nests can
                pose a serious threat, especially to those with allergies to their stings.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Signs of Infestation</h3>
                    <p>
                      Visible nests under eaves, in trees, shrubs, or underground, increased wasp activity around your
                      home, and wasps entering and exiting from a specific area of your home or yard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Common Species</h3>
                    <p>
                      Yellow jackets (black and yellow, aggressive, often nest in the ground), paper wasps (slender with
                      dangling legs, build open-comb nests), and bald-faced hornets (black and white, build large
                      enclosed paper nests).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Our Solution</h3>
                    <p>
                      We safely remove wasp and hornet nests using specialized equipment and treatments, with minimal
                      risk to you and your family.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Wasp Removal</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/wasps.png" alt="Wasp Nest" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8" />
                  <span className="text-xl font-bold">Safe Removal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-wood-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Wasp & Hornet Control Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Inspection & Assessment</h3>
              <p>
                Our technicians identify the species of stinging insect, locate all nests on your property, and develop
                a safe removal plan based on nest location and size.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Safe Nest Removal</h3>
              <p>
                Using specialized equipment and protective gear, we safely treat and remove wasp and hornet nests,
                eliminating the entire colony with minimal risk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Prevention Strategies</h3>
              <p>
                We identify and seal potential nesting sites, provide recommendations to make your property less
                attractive to wasps, and offer follow-up inspections during peak season.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Don't Risk Dangerous Stings</h2>
            <p className="text-xl mb-8">
              Wasp and hornet removal can be dangerous, especially for those with allergies. Let our professionals
              safely eliminate these stinging insects from your property.
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
