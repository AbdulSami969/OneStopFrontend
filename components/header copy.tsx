"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { getHeaderData } from "@/lib/queries/header";
import { urlForImage } from "@/lib/sanity.image";

// Types for header data
interface NavItem {
  name: string;
  href: string;
}

interface PhoneInfo {
  displayText: string;
  phoneNumber: string;
  phoneLink: string;
}

interface ButtonInfo {
  text: string;
  href: string;
}

interface HeaderData {
  logo?: any;
  phoneInfo: PhoneInfo;
  topNavigation: NavItem[];
  mainNavigation: NavItem[];
  requestServiceButton: ButtonInfo;
}

// This component handles the client-side functionality, while getting data from props
function HeaderClient({ headerData }: { headerData: HeaderData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fallback values if Sanity data is not available
  const logoUrl = headerData?.logo ? urlForImage(headerData.logo).toString() : "/images/logo-u661-1.png";
  const phoneInfo = headerData?.phoneInfo || {
    displayText: "CALL US TODAY!",
    phoneNumber: "518-728-5589",
    phoneLink: "tel:5187285589",
  };
  const topNavigation = headerData?.topNavigation || [
    { name: "Where We Service", href: "/service-areas" },
    { name: "Contact", href: "/contact" },
  ];
  const mainNavigation = headerData?.mainNavigation || [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Commercial", href: "/commercial" },
    { name: "Pest Research", href: "/pest-library" },
  ];
  const requestButton = headerData?.requestServiceButton || {
    text: "REQUEST SERVICE",
    href: "/contact",
  };

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.innerHTML = '<span class="text-xl font-bold text-pest-red">1 Stop Pest Control</span>';
    }
  };

  const handleMobileImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.innerHTML = '<span class="text-lg font-bold text-pest-red">1 Stop Pest</span>';
    }
  };

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
              <span className="font-bold text-gray-800 mr-2">{phoneInfo.displayText}</span>
              <a href={phoneInfo.phoneLink} className="text-xl font-bold text-pest-red hover:text-pest-red/80 transition-colors">
                {phoneInfo.phoneNumber}
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
              <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={220} height={80} className="h-16 w-auto" priority onError={handleImageError} />
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
            <Link href={requestButton.href} className="inline-flex items-center bg-pest-red text-white px-8 py-3 rounded-full font-bold hover:bg-pest-red/90 transition-colors">
              {requestButton.text}
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header - New 3-column Layout */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        {/* Left: Menu Button */}
        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
        </button>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={150} height={60} className="h-12 w-auto" priority onError={handleMobileImageError} />
          </Link>
        </div>

        {/* Right: Phone Button */}
        <a href={phoneInfo.phoneLink} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pest-red text-white" aria-label="Call us">
          <Phone className="h-5 w-5" />
        </a>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg border-t border-gray-200">
          {mainNavigation.map((item) => (
            <Link key={item.name} href={item.href} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-pest-red flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="mt-4 px-3 py-2">
            <Link href={requestButton.href} className="block w-full text-center bg-pest-red text-white px-4 py-2 rounded-full font-bold hover:bg-pest-red/90 transition-colors" onClick={() => setIsOpen(false)}>
              {requestButton.text}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Server component that fetches data and passes it to client component
export default async function Header() {
  // Fetch header data from Sanity
  const headerData = await getHeaderData();

  // Render the client component with data
  return <HeaderClient headerData={headerData || {}} />;
}
