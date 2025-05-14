import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, Check, Building2, ShieldCheck, Clock, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import CTASection from "@/components/cta-section"
import Testimonials from "@/components/testimonials"
import ServiceAreas from "@/components/service-areas"

export default function CommercialPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-gray-900 flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/commercial-hero.png"
            alt="Albany commercial buildings"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-medium mb-4">SERVING THE ALBANY CAPITAL REGION</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Aim High With Our Commercial Pest Control Services
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-4">
              YOUR ONE STOP SOLUTION BECAUSE OUR SERVICE IS BEYOND THE REST
            </p>
            <p className="text-lg mb-8">When it comes to pest control, our name says it all.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-6 text-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  SCHEDULE YOUR APPOINTMENT
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  CONTACT US
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Banner */}
      <section className="bg-pest-red py-4">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-white">
            <p className="text-center md:text-left mb-2 md:mb-0">
              1 Stop Pest Control received an average rating of 4.8 out of 5 stars from our satisfied customers.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Link href="#" className="text-white underline hover:text-white/90">
                Read Google Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Commercial Pest Control for Albany Businesses
            </h2>
            <p className="text-lg mb-8 text-center">
              At 1 Stop Pest Control, we understand that pest issues can damage your reputation, disrupt operations, and
              impact your bottom line. Our commercial pest control services are designed to protect your business,
              employees, and customers from unwanted pests.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-pest-red" />
                  Customized Solutions
                </h3>
                <p>
                  We develop tailored pest management programs specific to your industry, facility, and unique
                  challenges. Our approach ensures effective pest control while minimizing disruption to your business
                  operations.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-pest-red" />
                  Compliance & Documentation
                </h3>
                <p>
                  Our services help you maintain compliance with health regulations, industry standards, and audit
                  requirements. We provide detailed documentation of all services performed and recommendations made.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-pest-red" />
                  Responsive Service
                </h3>
                <p>
                  We understand that pest issues require prompt attention. Our team is committed to quick response times
                  and flexible scheduling to address your pest control needs when they arise.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-pest-red" />
                  Experienced Professionals
                </h3>
                <p>
                  Our technicians are highly trained, licensed, and experienced in commercial pest control. They
                  understand the unique challenges faced by different industries and know how to address them
                  effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Restaurants & Food Service",
                image: "/images/restaurant.png",
                description:
                  "Protect your reputation and meet health code requirements with our discreet and effective pest control services for restaurants and food service establishments.",
              },
              {
                title: "Healthcare Facilities",
                image: "/images/healthcare.png",
                description:
                  "We help hospitals, clinics, and long-term care facilities maintain pest-free environments that meet strict healthcare regulations and protect vulnerable patients.",
              },
              {
                title: "Office Buildings",
                image: "/images/office-building.png",
                description:
                  "Create a comfortable, pest-free work environment for your employees and visitors with our professional commercial pest control services.",
              },
              {
                title: "Retail Stores",
                image: "/images/retail.png",
                description:
                  "Protect your inventory and provide a pleasant shopping experience with our retail-focused pest management solutions.",
              },
              {
                title: "Warehouses & Distribution",
                image: "/images/warehouse.png",
                description:
                  "Safeguard your inventory and maintain efficient operations with our comprehensive pest control services for warehouses and distribution centers.",
              },
              {
                title: "Educational Institutions",
                image: "/images/school.png",
                description:
                  "We help schools, colleges, and universities create safe, healthy learning environments for students and staff with our specialized pest control programs.",
              },
            ].map((industry, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                  <p className="mb-4">{industry.description}</p>
                  <Link
                    href="/contact"
                    className="text-pest-red font-medium hover:text-pest-red/80 flex items-center gap-1"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commercial Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Commercial Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Integrated Pest Management (IPM)",
                description:
                  "Our IPM approach focuses on long-term prevention through a combination of techniques such as habitat modification, exclusion, and targeted treatments.",
              },
              {
                title: "Routine Maintenance Programs",
                description:
                  "Regular scheduled service visits to prevent pest problems before they start, with flexible scheduling to minimize disruption to your business.",
              },
              {
                title: "Emergency Pest Control",
                description:
                  "Rapid response services for urgent pest situations that require immediate attention to protect your business and reputation.",
              },
              {
                title: "Bed Bug Heat Treatment",
                description:
                  "Our specialized heat treatment effectively eliminates bed bugs in hotels, apartments, and other commercial properties without the use of chemicals.",
              },
              {
                title: "Bird Control & Exclusion",
                description:
                  "Humane bird deterrent systems and exclusion methods to protect your property from damage and health hazards associated with birds.",
              },
              {
                title: "Rodent Control Programs",
                description:
                  "Comprehensive rodent management including inspection, exclusion, trapping, and monitoring to keep mice and rats out of your facility.",
              },
              {
                title: "Fly Control Solutions",
                description:
                  "Effective fly management programs tailored to restaurants, food processing facilities, and other businesses where flies are a concern.",
              },
              {
                title: "Cockroach Management",
                description:
                  "Advanced techniques to eliminate cockroach infestations in commercial kitchens, food service areas, and other sensitive environments.",
              },
            ].map((service, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-pest-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Commercial Pest Control Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Comprehensive Inspection",
                description:
                  "We begin with a thorough inspection of your facility to identify current pest issues, potential entry points, and conditions that may attract pests.",
              },
              {
                number: "02",
                title: "Customized Plan",
                description:
                  "Based on our findings, we develop a tailored pest management plan specific to your business needs, industry requirements, and pest challenges.",
              },
              {
                number: "03",
                title: "Implementation",
                description:
                  "Our trained technicians implement the plan using the most effective and appropriate methods, with minimal disruption to your business operations.",
              },
              {
                number: "04",
                title: "Monitoring & Follow-up",
                description:
                  "We provide ongoing monitoring, detailed documentation, and regular follow-up visits to ensure continued protection and make adjustments as needed.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg relative">
                <div className="absolute -top-5 -left-5 bg-pest-red text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Choose 1 Stop Pest Control for Your Business?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p>
                  As a local company serving the Albany Capital Region, we understand the specific pest challenges
                  businesses face in our area and how to address them effectively.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Discreet Service</h3>
                <p>
                  We provide professional, discreet service that protects your business reputation while effectively
                  addressing pest issues.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Eco-Friendly Options</h3>
                <p>
                  We offer environmentally responsible pest control solutions that are effective while minimizing impact
                  on the environment.
                </p>
              </div>
              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Guaranteed Results</h3>
                <p>
                  We stand behind our work with service guarantees that ensure your satisfaction and ongoing protection
                  from pests.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-6 text-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  REQUEST A FREE COMMERCIAL INSPECTION
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Service Areas */}
      <ServiceAreas />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Frequently Asked Questions About Commercial Pest Control
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "How often should my business have pest control service?",
                  answer:
                    "The frequency of service depends on your industry, facility type, and specific pest pressures. Food service businesses typically require more frequent service (often monthly), while office buildings might need quarterly service. We'll recommend an appropriate schedule based on your specific needs.",
                },
                {
                  question: "Will pest control treatments disrupt my business operations?",
                  answer:
                    "We understand the importance of minimizing disruption to your business. Our technicians can work during off-hours or less busy times, and we use methods that allow for quick re-entry in most cases. We'll work with you to develop a service schedule that fits your operational needs.",
                },
                {
                  question: "Are your commercial pest control methods safe?",
                  answer:
                    "Yes, safety is our priority. We use Integrated Pest Management (IPM) techniques that focus on the least toxic methods first. When products are needed, we select those with the lowest risk profile and apply them in a targeted manner to minimize exposure. All our methods comply with industry regulations and safety standards.",
                },
                {
                  question: "Do you provide documentation for health inspections and audits?",
                  answer:
                    "Absolutely. We provide detailed service reports after each visit and maintain comprehensive records of all treatments, monitoring, and recommendations. Our documentation is designed to help you meet health department requirements, third-party audits, and industry-specific regulations.",
                },
                {
                  question: "Can you help with emergency pest situations?",
                  answer:
                    "Yes, we offer emergency response services for our commercial clients. We understand that some pest situations require immediate attention, and we prioritize urgent calls to address issues that could impact your business operations or reputation.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-light p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
