import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Shield, Check, Bug, Calendar, Phone, ArrowRight, Home } from "lucide-react"
import PestIcon from "@/components/pest-icons"

export default function ResidentialPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center relative py-24 md:py-32"
        style={{ backgroundImage: "url('/images/residential-hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Residential Pest Control Targets Pests Where They Hide!
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-4">SERVING THE ALBANY CAPITAL REGION SINCE 2018</p>
            <p className="text-lg md:text-xl mb-8">When it comes to pest control, our name says it all.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-8 py-6 text-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>SCHEDULE YOUR APPOINTMENT</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white rounded-full px-8 py-6 text-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>CONTACT US</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Banner */}
      <div className="bg-pest-red text-white py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <span>1 Stop Pest Control received an average rating of 4.8 out of 5 stars from our customers.</span>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Link href="/testimonials" className="ml-2 underline hover:no-underline">
                Read Google Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold">Residential Pest Control</h2>
              </div>
              <p className="text-lg mb-6">
                At 1 Stop Pest Control, we understand that your home is your sanctuary. That's why we offer
                comprehensive residential pest control services designed to eliminate pests and prevent them from
                returning.
              </p>
              <p className="text-lg mb-6">
                Our experienced technicians are trained to identify and target pests where they hide, using the most
                effective and environmentally responsible methods available. We customize our approach to address your
                specific pest concerns and the unique characteristics of your home.
              </p>
              <p className="text-lg mb-8">
                From one-time treatments to ongoing protection plans, we have solutions for every pest problem and
                budget. Our goal is to provide you with a pest-free home and peace of mind.
              </p>
              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/residential-service.png"
                  alt="Residential Pest Control Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">100% Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Residential Services</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We offer a comprehensive range of pest control services to keep your home protected from unwanted
              invaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image src="/images/bedbug-closeup.png" alt="Bed Bug Treatment" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <PestIcon type="bedbug" size={24} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Bed Bug Heat Treatment</h3>
                <p className="text-gray-700 mb-4">
                  Our specialty! We use advanced heat treatment technology to eliminate bed bugs at all life stages
                  without harmful chemicals.
                </p>
                <Link
                  href="/heat-treatment"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image
                  src="/images/general-pest-control.png"
                  alt="General Pest Control"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <Bug className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">General Pest Control</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive treatment for common household pests including ants, spiders, roaches, and more.
                </p>
                <Link
                  href="/pest-library"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image src="/images/rodents.png" alt="Rodent Control" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <PestIcon type="mouse" size={24} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Rodent Control</h3>
                <p className="text-gray-700 mb-4">
                  Effective elimination and exclusion services for mice and rats, protecting your home from damage and
                  disease.
                </p>
                <Link
                  href="/pests/mice"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image src="/images/wasps.png" alt="Stinging Insect Control" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <PestIcon type="wasp" size={24} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Stinging Insect Control</h3>
                <p className="text-gray-700 mb-4">
                  Safe removal of wasp, hornet, and yellow jacket nests from your property.
                </p>
                <Link
                  href="/pests/wasps"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image
                  src="/images/preventative-service.png"
                  alt="Preventative Programs"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Preventative Programs</h3>
                <p className="text-gray-700 mb-4">
                  Ongoing protection plans to keep pests away year-round with regular inspections and treatments.
                </p>
                <Link
                  href="/preventative-programs"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <Image src="/images/emergency-service.png" alt="Emergency Services" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-pest-red p-2 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Emergency Services</h3>
                <p className="text-gray-700 mb-4">
                  Fast response for urgent pest problems that can't wait for a regular appointment.
                </p>
                <Link
                  href="/emergency"
                  className="text-pest-red font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Residential Pest Control Process</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We follow a proven 4-step process to ensure your home receives the most effective pest control treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-light p-6 rounded-lg relative">
              <div className="absolute -top-5 -left-5 bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 mt-4">Inspection</h3>
              <p className="text-gray-700 mb-4">
                Our technicians conduct a thorough inspection of your property to identify pest species, locate entry
                points, and determine the extent of the infestation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Identify current and potential pest problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Locate entry points and harborage areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Assess environmental factors</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-light p-6 rounded-lg relative">
              <div className="absolute -top-5 -left-5 bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 mt-4">Treatment Plan</h3>
              <p className="text-gray-700 mb-4">
                Based on our findings, we develop a customized treatment plan tailored to your specific pest issues and
                the unique characteristics of your home.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Customize solutions for your specific needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Select appropriate treatment methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Provide detailed cost estimate</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-light p-6 rounded-lg relative">
              <div className="absolute -top-5 -left-5 bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 mt-4">Implementation</h3>
              <p className="text-gray-700 mb-4">
                Our trained technicians implement the treatment plan using the most effective and environmentally
                responsible methods available.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Apply targeted treatments</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Seal entry points</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Install preventative measures</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-light p-6 rounded-lg relative">
              <div className="absolute -top-5 -left-5 bg-pest-red h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold mb-4 mt-4">Follow-Up</h3>
              <p className="text-gray-700 mb-4">
                We conduct follow-up visits to ensure the effectiveness of our treatments and make any necessary
                adjustments to maintain a pest-free environment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Evaluate treatment effectiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Make adjustments as needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-pest-red flex-shrink-0 mt-0.5" />
                  <span>Provide ongoing prevention recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -right-4 text-pest-red opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">
                "I was referred to 1 Stop Pest Control by my property manager, so I gave them a call. Got an appointment
                for the next day for the time frame I needed! Other places had me leave a message or wasn't available
                for days to a week."
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border-2 border-pest-red">
                  <Image src="/professional-man-headshot.png" alt="John D." fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">John D.</p>
                  <p className="text-sm text-gray-600">Albany, NY</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -right-4 text-pest-red opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">
                "Their heat treatment for bedbugs was amazing! No chemicals and all the bugs were gone in one treatment.
                Worth every penny for the peace of mind."
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border-2 border-pest-red">
                  <Image src="/professional-woman-headshot.png" alt="Sarah M." fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-gray-600">Troy, NY</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -right-4 text-pest-red opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">
                "Professional, on time, and thorough. They took care of our ant problem and gave us great tips to
                prevent future issues. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border-2 border-pest-red">
                  <Image src="/placeholder.svg?key=x51o0" alt="Robert K." fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Robert K.</p>
                  <p className="text-sm text-gray-600">Rensselaer, NY</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
              <Link href="/testimonials">View All Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold">Service Areas</h2>
              </div>
              <p className="text-lg mb-6">
                1 Stop Pest Control proudly serves residential customers throughout the Albany Capital Region,
                including:
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Albany</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Rensselaer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Troy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Schenectady</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Colonie</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Clifton Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Latham</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-pest-red" />
                  <span>Delmar</span>
                </div>
              </div>

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href="/service-areas">View All Service Areas</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/albany-ny-skyline.png" alt="Albany Capital Region" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">Serving the Albany Capital Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Get answers to common questions about our residential pest control services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">How often should I have pest control treatments?</h3>
              <p>
                For most homes in the Albany area, we recommend quarterly treatments to maintain a pest-free
                environment. However, this can vary based on your specific situation, property characteristics, and the
                types of pests in your area.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Are your treatments safe for children and pets?</h3>
              <p>
                Yes, we use products that are EPA-approved and applied by trained professionals. We take extra
                precautions when children and pets are present, and we'll provide specific instructions on when it's
                safe to re-enter treated areas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do I need to leave my home during treatment?</h3>
              <p>
                For most general pest control treatments, you don't need to leave your home. However, for certain
                treatments like bed bug heat treatment, you'll need to be away from the treated areas for a specified
                period. We'll provide clear instructions before any treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">What if pests return between scheduled treatments?</h3>
              <p>
                We offer a service guarantee with our ongoing protection plans. If pests return between scheduled
                treatments, we'll return at no additional cost to address the issue. Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">How much does residential pest control cost?</h3>
              <p>
                Costs vary depending on the size of your home, the type of pests, the severity of the infestation, and
                the treatment plan selected. We provide free inspections and quotes, so you'll know exactly what to
                expect before any work begins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Do you offer emergency pest control services?</h3>
              <p>
                Yes, we understand that some pest situations can't wait. We offer emergency pest control services with
                rapid response times for urgent situations like wasp nests near entrances or sudden rodent infestations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready for a Pest-Free Home?</h2>
            <p className="text-xl mb-8">
              Contact 1 Stop Pest Control today for a free inspection and quote. Our experienced technicians are ready
              to help you eliminate pests and protect your home.
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
