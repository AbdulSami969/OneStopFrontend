import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-darker text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="bg-white/10 p-4 rounded-lg inline-block mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
                alt="1 Stop Pest Control LLC"
                width={180}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            <p className="mb-6 text-gray-300">
              Your affordable, premier pest control service in the Albany Capital Region. Specializing in heat treatment
              for bedbugs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="hover:text-pest-red transition-colors bg-gray-dark/50 p-3 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-pest-red transition-colors bg-gray-dark/50 p-3 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-pest-red transition-colors bg-gray-dark/50 p-3 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/heat-treatment"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Heat Treatment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/residential"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Residential</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Commercial</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/heat-treatment"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Bedbug Heat Treatment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/residential"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Residential Pest Control</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Commercial Pest Control</span>
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Emergency Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/preventative-programs"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Preventative Programs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pest-identification"
                  className="hover:text-pest-red transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                  <span>Pest Identification</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Phone</p>
                  <a href="tel:5187285589" className="text-xl hover:text-pest-red transition-colors">
                    518-728-5589
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Email</p>
                  <a href="mailto:info@1stoppestcontrolllc.com" className="hover:text-pest-red transition-colors">
                    info@1stoppestcontrolllc.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Address</p>
                  <address className="not-italic">
                    Rensselaer, NY
                    <br />
                    Albany Capital Region
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} 1 Stop Pest Control LLC. All rights reserved.
          </p>
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png"
              alt="1 Stop Pest Control LLC"
              width={80}
              height={30}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
