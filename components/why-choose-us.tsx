import { Award, Clock, ThumbsUp, Shield } from "lucide-react"
import Image from "next/image"

const reasons = [
  {
    title: "Affordable Quality",
    description: "High-quality pest control services at competitive prices",
    icon: ThumbsUp,
  },
  {
    title: "Heat Treatment Specialists",
    description: "Experts in eco-friendly bedbug elimination",
    icon: Award,
  },
  {
    title: "Certified Professionals",
    description: "Certified Pest Control Applicators with years of experience",
    icon: Shield,
  },
  {
    title: "Fast Response",
    description: "Quick service when you need it most",
    icon: Clock,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-5 pointer-events-none">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
          alt="1 Stop Pest Control LLC"
          width={500}
          height={500}
          className="h-[600px] w-auto"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            </div>
            <p className="text-lg mb-8">
              Welcome to 1 Stop Pest Control, LLC, your affordable, premier pest control service located in Rensselaer,
              NY. We provide a variety of pest removal services with the skill and experience necessary to serve as your
              Certified Pest Control Applicator.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{reason.title}</h3>
                    <p className="text-gray-700">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?key=v6vqy"
                alt="1 Stop Pest Control Technician"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-6 rounded-lg shadow-lg max-w-[220px]">
              <p className="font-bold text-xl">100% Satisfaction Guaranteed</p>
            </div>
            <div className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
                alt="1 Stop Pest Control LLC"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
