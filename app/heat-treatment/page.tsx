import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Thermometer, Bug, ShieldCheck, Clock, Zap } from "lucide-react"

export default function HeatTreatmentPage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/heat-treatment.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bedbug Heat Treatment Specialists</h1>
            <p className="text-xl mb-8">
              Our specialty service: Eco-friendly, chemical-free heat treatment that eliminates bedbugs at all life
              stages.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Heat Treatment?</h2>
              <p className="text-lg mb-6">
                Heat treatment is the most effective way to eliminate bedbugs. Unlike chemical treatments that may
                require multiple applications, our heat treatment can eliminate bedbugs in a single session.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">100% Effective</h3>
                    <p>Heat penetrates all areas, eliminating bedbugs at all life stages, including eggs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Chemical-Free</h3>
                    <p>No harmful chemicals or residues, making it safe for your family and pets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">One-Time Treatment</h3>
                    <p>Most infestations are eliminated in a single treatment, saving you time and money.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Reaches Hidden Areas</h3>
                    <p>Heat penetrates walls, furniture, and other hiding spots that chemicals can't reach.</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Heat Treatment</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/bedbug-closeup.png" alt="Bedbug Close-up" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-8 w-8" />
                  <span className="text-2xl font-bold">140°F+</span>
                </div>
                <p className="text-sm">Lethal temperature for bedbugs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Heat Treatment Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Inspection & Preparation</h3>
              <p>
                Our technicians thoroughly inspect your property to identify the extent of the infestation and prepare a
                customized treatment plan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Heat Application</h3>
              <p>
                We use specialized equipment to raise the temperature in the affected areas to 140°F or higher, which is
                lethal to bedbugs at all life stages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Monitoring & Verification</h3>
              <p>
                Throughout the process, we monitor temperatures to ensure all areas reach the lethal temperature and
                verify the elimination of the infestation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <Bug className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Don't Let Bedbugs Take Over Your Home</h2>
            <p className="text-xl mb-8">
              Our heat treatment is the most effective solution for eliminating bedbugs. Contact us today for a
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
