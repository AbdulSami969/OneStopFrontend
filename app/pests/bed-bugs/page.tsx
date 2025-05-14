import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Thermometer, Bug, ShieldCheck, AlertTriangle } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function BedBugsPage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/bedbug-closeup.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">
              <PestIcon type="bedbug" size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bed Bug Control</h1>
            <p className="text-xl mb-8">Effective bed bug elimination with our specialized heat treatment technology</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Bed Bug Identification</h2>
              <p className="text-lg mb-6">
                Bed bugs are small, oval, brownish insects that feed on the blood of animals or humans. Adult bed bugs
                have flat bodies about the size of an apple seed. After feeding, their bodies swell and become reddish
                in color.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Signs of Infestation</h3>
                    <p>
                      Rusty or reddish stains on bed sheets or mattresses, dark spots (excrement), egg shells, shed
                      skins, and a sweet musty odor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Where They Hide</h3>
                    <p>
                      Mattresses, box springs, bed frames, and headboards where they have easy access to people to bite
                      during the night.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Thermometer className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Our Solution</h3>
                    <p>
                      Our specialized heat treatment eliminates bed bugs at all life stages, including eggs, without
                      harmful chemicals.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Bed Bug Treatment</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/bedbug-closeup.png" alt="Bed Bug Close-up" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8" />
                  <span className="text-xl font-bold">100% Elimination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-wood-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Bed Bug Heat Treatment Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Thorough Inspection</h3>
              <p>
                Our technicians conduct a comprehensive inspection to identify the extent of the infestation and all
                affected areas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Heat Application</h3>
              <p>
                We use specialized equipment to raise the temperature to 140°F or higher, which is lethal to bed bugs at
                all life stages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Verification & Prevention</h3>
              <p>
                After treatment, we verify complete elimination and provide prevention tips to avoid future
                infestations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Don't Let Bed Bugs Take Over Your Home</h2>
            <p className="text-xl mb-8">
              Our heat treatment is the most effective solution for eliminating bed bugs. Contact us today for a
              consultation.
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
