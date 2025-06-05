import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { getFooterData } from "@/lib/queries/footer";
import { urlForImage } from "@/lib/sanity.image";

// Define types for footer data
interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ContactInfo {
  title: string;
  phone: string;
  phoneLink: string;
  email: string;
  emailLink: string;
  address: string[];
}

interface FooterData {
  companyInfo: {
    logo: any;
    description: string;
    socialLinks: SocialLink[];
  };
  quickLinks: FooterSection;
  servicesLinks: FooterSection;
  contactInfo: ContactInfo;
  copyright: {
    text: string;
    showLogo: boolean;
  };
}

// Helper function to render the appropriate social icon based on platform
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-5 w-5" />;
    case "instagram":
      return <Instagram className="h-5 w-5" />;
    case "twitter":
      return <Twitter className="h-5 w-5" />;
    default:
      return <Facebook className="h-5 w-5" />;
  }
};

export default async function Footer() {
  // Fetch footer data from Sanity
  const footerData: FooterData | null = await getFooterData();

  // Fallback values if Sanity data is not available
  const companyDescription = footerData?.companyInfo?.description || "Your affordable, premier pest control service in the Albany Capital Region. Specializing in heat treatment for bedbugs.";
  const logoUrl = footerData?.companyInfo?.logo ? urlForImage(footerData.companyInfo.logo).toString() : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png";

  // Social links with fallbacks
  const socialLinks = footerData?.companyInfo?.socialLinks || [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "twitter", url: "https://twitter.com" },
  ];

  // Quick links with fallbacks
  const quickLinksTitle = footerData?.quickLinks?.title || "Quick Links";
  const quickLinks = footerData?.quickLinks?.links || [
    { text: "Home", url: "/" },
    { text: "Services", url: "/services" },
    { text: "Heat Treatment", url: "/heat-treatment" },
    { text: "Residential", url: "/residential" },
    { text: "Commercial", url: "/commercial" },
    { text: "About Us", url: "/about" },
    { text: "Contact", url: "/contact" },
  ];

  // Services links with fallbacks
  const servicesTitle = footerData?.servicesLinks?.title || "Our Services";
  const serviceLinks = footerData?.servicesLinks?.links || [
    { text: "Bedbug Heat Treatment", url: "/heat-treatment" },
    { text: "Residential Pest Control", url: "/residential" },
    { text: "Commercial Pest Control", url: "/commercial" },
    { text: "Emergency Services", url: "/emergency" },
    { text: "Preventative Programs", url: "/preventative-programs" },
    { text: "Pest Identification", url: "/pest-identification" },
  ];

  // Contact info with fallbacks
  const contactTitle = footerData?.contactInfo?.title || "Contact Us";
  const phone = footerData?.contactInfo?.phone || "518-728-5589";
  const phoneLink = footerData?.contactInfo?.phoneLink || "tel:5187285589";
  const email = footerData?.contactInfo?.email || "info@1stoppestcontrolllc.com";
  const emailLink = footerData?.contactInfo?.emailLink || "mailto:info@1stoppestcontrolllc.com";
  const address = footerData?.contactInfo?.address || ["Rensselaer, NY", "Albany Capital Region"];

  // Copyright with fallbacks
  const copyrightText = footerData?.copyright?.text?.replace("{year}", new Date().getFullYear().toString()) || `© ${new Date().getFullYear()} 1 Stop Pest Control LLC. All rights reserved.`;
  const showLogo = footerData?.copyright?.showLogo ?? true;

  return (
    <footer className="bg-gray-darker text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="bg-white/10 p-4 rounded-lg inline-block mb-6">
              <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={180} height={80} className="h-16 w-auto" />
            </div>
            <p className="mb-6 text-gray-300">{companyDescription}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.url} className="hover:text-pest-red transition-colors bg-gray-dark/50 p-3 rounded-full">
                  {getSocialIcon(social.platform)}
                  <span className="sr-only">{social.platform}</span>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <a className="mt-5" href="https://www.bbb.org/us/ny/rensselaer/profile/pest-control-services/1-stop-pest-control-llc-0041-236026468/#sealclick" target="_blank" rel="nofollow">
                <img src="https://seal-upstateny.bbb.org/seals/blue-seal-293-61-bbb-236026468.png" alt="1 Stop Pest Control LLC BBB Business Review" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              {quickLinksTitle}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              {servicesTitle}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-pest-red transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all" />
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-pest-red h-6 w-1 mr-3"></span>
              {contactTitle}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Phone</p>
                  <a href={phoneLink} className="text-xl hover:text-pest-red transition-colors">
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Email</p>
                  <a href={emailLink} className="hover:text-pest-red transition-colors">
                    {email}
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
                    {address.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < address.length - 1 && <br />}
                      </span>
                    ))}
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
          <p className="text-sm text-gray-400 mb-4 md:mb-0">{copyrightText}</p>
          {showLogo && (
            <div className="flex items-center">
              <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={80} height={30} className="h-8 w-auto" />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
