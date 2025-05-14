import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bug, ShieldCheck, AlertTriangle, Home } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function AntsPage() {
  return (
    <>
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/images/antcontrol.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-4">
              <PestIcon type="ant" size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ant Control</h1>
            <p className="text-xl mb-8">Effective ant elimination and prevention for your home or business</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ant Identification</h2>
              <p className="text-lg mb-6">
                Ants are social insects that live in colonies. They can quickly establish themselves in and around your
                home, becoming a persistent nuisance. The Albany Capital Region is home to several species of ants,
                including carpenter ants, pavement ants, and odorous house ants.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Signs of Infestation</h3>
                    <p>
                      Visible ant trails, small piles of wood shavings (from carpenter ants), nests in walls or under
                      floors, and ants in food storage areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bug className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Common Species</h3>
                    <p>
                      Carpenter ants (large, black ants that can damage wood), pavement ants (small, dark ants often
                      found on sidewalks), and odorous house ants (emit a foul smell when crushed).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-6 w-6 text-pest-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Our Solution</h3>
                    <p>
                      We use targeted treatments to eliminate ant colonies at their source, not just the visible
                      workers, providing long-lasting protection for your home.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Schedule Ant Treatment</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/ant-closeup.png" alt="Ant Close-up" fill className="object-contain" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8" />
                  <span className="text-xl font-bold">Complete Elimination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-wood-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Ant Control Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Thorough Inspection</h3>
              <p>
                Our technicians conduct a comprehensive inspection to identify the ant species, locate nests, and
                determine entry points and food sources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Targeted Treatment</h3>
              <p>
                We apply specialized treatments to eliminate the entire colony, including the queen, not just the
                visible worker ants that make up only a small percentage of the colony.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Prevention & Monitoring</h3>
              <p>
                We implement preventative measures to keep ants from returning and provide recommendations for ongoing
                protection. Follow-up visits ensure complete elimination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Don't Let Ants Take Over Your Home</h2>
            <p className="text-xl mb-8">
              Our professional ant control services eliminate existing infestations and prevent future problems. Contact
              us today for a consultation.
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
