import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star, Phone, ArrowRight } from "lucide-react"

// List of areas served
const serviceAreas = [
  {
    county: "Albany County",
    cities: ["Albany", "Colonie", "Guilderland", "Bethlehem", "New Scotland", "Cohoes", "Watervliet", "Green Island"],
  },
  {
    county: "Rensselaer County",
    cities: [
      "Troy",
      "East Greenbush",
      "North Greenbush",
      "Rensselaer",
      "Brunswick",
      "Schodack",
      "Poestenkill",
      "Nassau",
    ],
  },
  {
    county: "Schenectady County",
    cities: ["Schenectady", "Niskayuna", "Rotterdam", "Glenville", "Scotia", "Duanesburg", "Princetown"],
  },
  {
    county: "Saratoga County",
    cities: [
      "Saratoga Springs",
      "Clifton Park",
      "Halfmoon",
      "Malta",
      "Ballston Spa",
      "Wilton",
      "Mechanicville",
      "Waterford",
    ],
  },
]

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center relative py-16 md:py-24"
        style={{ backgroundImage: "url('/albany-ny-skyline.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Areas We Serve</h1>
            <p className="text-xl mb-8">SERVING THE ALBANY CAPITAL REGION SINCE 2018</p>
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

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-pest-red">WHERE WE SERVICE</h2>
            <h3 className="text-xl md:text-2xl font-bold mb-12 text-center">
              PROFESSIONAL PEST SERVICES FOR THE ALBANY CAPITAL REGION & SURROUNDING AREAS
            </h3>

            <p className="text-lg mb-8">
              Serving the Albany Capital Region since 2018, 1 Stop Pest Control provides complete home pest control, as
              well as commercial pest control solutions to our customers. If you have pest control needs, please consult
              the list below to see if we work in your area, then contact us. If your community is not listed below,
              contact us to see if we can still be of assistance.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-pest-red mr-2" />
                    {area.county}
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {area.cities.map((city, cityIndex) => (
                      <li key={cityIndex} className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-pest-red mr-2" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gray-light p-8 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">Don't see your area listed?</h3>
              <p className="mb-6">
                We may still be able to service your location. Contact us to inquire about service availability in your
                area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-pest-red text-pest-red hover:bg-pest-red/10"
                >
                  <Link href="tel:5187285589" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>518-728-5589</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Service Area</h2>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/albany-ny-skyline.png" alt="Albany Capital Region Map" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 p-6 rounded-lg max-w-md text-center">
                  <h3 className="text-xl font-bold mb-2">Albany Capital Region</h3>
                  <p className="mb-4">
                    We proudly serve Albany, Rensselaer, Schenectady, and Saratoga counties, covering a 30-mile radius
                    from our base in Rensselaer.
                  </p>
                  <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                    <Link href="/contact">Schedule Service</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact 1 Stop Pest Control today for a free consultation and take the first step towards a pest-free
              environment.
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
