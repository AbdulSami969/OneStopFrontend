import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-white pt-12 pb-6">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pest-red">Contact Us</h1>
            <p className="text-xl text-gray-700 mb-0">
              Get in touch with 1 Stop Pest Control for all your pest management needs in the Albany Capital Region
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl font-bold">Get In Touch</h2>
              </div>
              <p className="text-lg mb-8">
                Have a pest problem? Need a quote? Or just have a question? We're here to help! Contact 1 Stop Pest
                Control using any of the methods below or fill out our contact form.
              </p>

              <div className="space-y-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Call us directly:</p>
                    <a href="tel:5187285589" className="text-2xl font-bold text-pest-red hover:underline">
                      518-728-5589
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">Send us an email:</p>
                    <a
                      href="mailto:info@1stoppestcontrolllc.com"
                      className="text-lg font-medium text-pest-red hover:underline"
                    >
                      info@1stoppestcontrolllc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Service Area</h3>
                    <p className="text-gray-600 mb-1">We proudly serve:</p>
                    <p className="text-lg">The entire Albany Capital Region</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Business Hours</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-medium">Monday - Friday</p>
                        <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium">Saturday</p>
                        <p className="text-gray-600">9:00 AM - 3:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium">Sunday</p>
                        <p className="text-gray-600">Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Emergency Services</h3>
                <p className="mb-4">
                  Pest emergency? We offer urgent response services for critical pest situations. Call our emergency
                  line:
                </p>
                <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 w-full">
                  <Link href="tel:5187285589" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>518-728-5589</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-light p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Areas We Serve</h2>
            <p className="text-lg max-w-3xl mx-auto">
              1 Stop Pest Control proudly serves the entire Albany Capital Region, including the following areas:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Albany",
              "Rensselaer",
              "Troy",
              "Schenectady",
              "Colonie",
              "Clifton Park",
              "Latham",
              "Delmar",
              "Guilderland",
              "East Greenbush",
              "Cohoes",
              "Watervliet",
              "Saratoga Springs",
              "Ballston Spa",
              "Malta",
              "Glenville",
            ].map((city, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 text-center hover:bg-pest-red hover:text-white transition-colors"
              >
                {city}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
              <Link href="/service-areas" className="flex items-center gap-2">
                <span>View All Service Areas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
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
                <Link href="tel:5187285589" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call 518-728-5589</span>
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href="/book">Schedule an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
