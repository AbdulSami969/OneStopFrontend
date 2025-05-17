import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

// Add type for the component props
type HeroProps = {
  data?: any; // We'll use any for now, but ideally this would be a more specific type
};

export default function Hero({ data }: HeroProps = {}) {
  // If we have data from Sanity, use it, otherwise fall back to default values
  const title = data?.title || "Albany's Premier Pest Control Service";
  const description = data?.description || "Specializing in heat treatment for bedbugs and comprehensive pest control solutions.";
  const buttonText = data?.ctaButton?.text || "Get a Free Quote";
  const buttonLink = data?.ctaButton?.link || "/contact";
  const backgroundImage = data?.backgroundImageUrl || "/images/1StopPestAlbany.png";
  const logoUrl = data?.logoImageUrl || "/images/1stop-logo.png";

  // Process pest icons if available
  const pestIcons = data?.pestIcons || [
    { name: "Bed Bugs", iconUrl: "/images/bedbug.png" },
    { name: "Ants", iconUrl: "/images/ants.png" },
    { name: "Roaches", iconUrl: "/images/roaches.png" },
    { name: "Rodents", iconUrl: "/images/rodents.png" },
    { name: "Wasps", iconUrl: "/images/wasps.png" },
  ];

  return (
    <section className="relative bg-cover bg-center min-h-[500px] md:min-h-[600px]" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-12 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-full inline-block">
              <Image
                src={logoUrl}
                alt="1 Stop Pest Control LLC"
                width={180}
                height={90}
                className="w-[180px] h-[90px] object-contain"
                // priority
                // onError={(e) => {
                //   // Fallback to text if image fails to load
                //   e.currentTarget.style.display = "none"
                //   e.currentTarget.parentElement.innerHTML =
                //     '<span class="text-2xl font-bold text-white">1 Stop Pest Control</span>'
                // }}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">{title}</h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-8">{description}</p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-6 py-5 md:px-8 md:py-6 text-base md:text-lg">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Graphic Elements */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 bg-white/10 backdrop-blur-sm py-3 px-3 md:py-4 md:px-6 rounded-t-lg">
            {pestIcons.slice(0, 5).map((pest: any, index: number) => (
              <div key={index} className={`flex flex-col items-center text-white text-center ${index > 2 ? "hidden md:flex" : ""}`}>
                <div className="relative w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-2 overflow-hidden rounded-md">
                  <Image src={pest.iconUrl} alt={`${pest.name} Control`} width={40} height={40} className="object-cover w-[40px] h-[40px]" loading="eager" />
                </div>
                <span className="text-xs md:text-sm font-medium truncate w-full">{pest.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
