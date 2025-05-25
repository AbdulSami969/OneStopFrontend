"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const topNavigation = [
  { name: "Where We Service", href: "/service-areas" },
  { name: "Contact", href: "/contact" },
];

const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Commercial", href: "/commercial" },
  { name: "Pest Research", href: "/pest-library" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 w-full transition-all duration-200", scrolled ? "bg-white shadow-md" : "bg-white")}>
      {/* Top Navigation Bar - Desktop Only */}
      <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex space-x-6">
              {topNavigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm text-gray-600 hover:text-pest-red transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-800 mr-2">CALL US TODAY!</span>
              <a href="tel:5187285589" className="text-xl font-bold text-pest-red hover:text-pest-red/80 transition-colors">
                518-728-5589
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Desktop */}
      <div className="hidden lg:block container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-u661-1.png"
                alt="1 Stop Pest Control LLC"
                width={220}
                height={80}
                className="h-16 w-auto"
                priority
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = "none";
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerHTML = '<span class="text-xl font-bold text-pest-red">1 Stop Pest Control</span>';
                  }
                }}
              />
            </Link>
          </div>

          {/* Desktop Main Navigation */}
          <nav className="flex space-x-8">
            {mainNavigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-base font-medium text-gray-800 hover:text-pest-red transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Request Service Button (Desktop) */}
          <div>
            <Link href="/contact" className="inline-flex items-center bg-pest-red text-white px-8 py-3 rounded-full font-bold hover:bg-pest-red/90 transition-colors">
              REQUEST SERVICE
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header - Fixed overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu Button */}
          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-800" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
          </button>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-u661-1.png"
                alt="1 Stop Pest Control LLC"
                width={150}
                height={60}
                className="h-16 w-auto"
                priority
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = "none";
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerHTML = '<span class="text-lg font-bold text-pest-red">1 Stop Pest</span>';
                  }
                }}
              />
            </Link>
          </div>

          {/* Right: Phone Button */}
          <a href="tel:5187285589" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pest-red text-white" aria-label="Call us">
            <Phone className="h-5 w-5" />
          </a>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"} fixed top-[80px] left-0 right-0 bottom-0 z-40`}>
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>

          {/* Menu content */}
          <div className="relative bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainNavigation.map((item) => (
                <Link key={item.name} href={item.href} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-pest-red flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link href="/service-areas" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-pest-red flex items-center gap-2" onClick={() => setIsOpen(false)}>
                Service Area
              </Link>
              <div className="mt-4 px-3 py-2">
                <Link href="/contact" className="block w-full text-center bg-pest-red text-white px-4 py-2 rounded-full font-bold hover:bg-pest-red/90 transition-colors" onClick={() => setIsOpen(false)}>
                  REQUEST SERVICE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
