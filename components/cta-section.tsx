import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-20 bg-pest-red text-white relative overflow-hidden">
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-10 pointer-events-none">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
          alt="1 Stop Pest Control LLC"
          width={400}
          height={400}
          className="h-[500px] w-auto"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 p-3 rounded-full inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
                alt="1 Stop Pest Control LLC"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Rid of Pests for Good?</h2>
          <p className="text-xl mb-8">
            Contact 1 Stop Pest Control today for a free quote and take the first step towards a pest-free environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-pest-red hover:bg-gray-100 border-white rounded-full px-8 py-6 text-lg"
            >
              <Link href="/contact" className="flex items-center">
                <span>Get a Free Quote</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-6 text-lg"
            >
              <Link href="tel:5187285589" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>518-728-5589</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
