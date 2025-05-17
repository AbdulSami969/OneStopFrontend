import { Award, Clock, ThumbsUp, Shield } from "lucide-react";
import Image from "next/image";
import * as Icons from "react-icons/fa";
import * as MdiIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";

// Define props type
type WhyChooseUsProps = {
  data?: any;
};

// Default reasons if no data is provided
const defaultReasons = [
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
];

export default function WhyChooseUs({ data }: WhyChooseUsProps = {}) {
  // Use data from Sanity if available, otherwise use default values
  const title = data?.title || "Why Choose Us";
  const description = data?.description || "Welcome to 1 Stop Pest Control, LLC, your affordable, premier pest control service located in Rensselaer, NY. We provide a variety of pest removal services with the skill and experience necessary to serve as your Certified Pest Control Applicator.";
  const badgeText = data?.badgeText || "100% Satisfaction Guaranteed";
  const featuredImageUrl = data?.featuredImageUrl || "/placeholder.svg?key=v6vqy";

  // Process reasons data
  const reasons = data?.reasons?.length
    ? data.reasons.map((reason: any) => ({
        title: reason.title,
        description: reason.description,
        icon: renderIcon(reason.icon),
      }))
    : defaultReasons;

  // Helper function to render the correct icon
  function renderIcon(iconData: any) {
    if (!iconData) return ThumbsUp;

    // Handle string references (legacy)
    if (typeof iconData === "string") {
      switch (iconData) {
        case "ThumbsUp":
          return ThumbsUp;
        case "Award":
          return Award;
        case "Shield":
          return Shield;
        case "Clock":
          return Clock;
        default:
          return ThumbsUp;
      }
    }

    // Handle icon picker format
    if (iconData._type === "iconPicker") {
      if (iconData.provider === "fa") {
        const FaIcon = (Icons as any)[iconData.name];
        return FaIcon || ThumbsUp;
      } else if (iconData.provider === "mdi") {
        const MdiIcon = (MdiIcons as any)[iconData.name];
        return MdiIcon || ThumbsUp;
      } else if (iconData.provider === "hi") {
        const HiIcon = (HiIcons as any)[iconData.name];
        return HiIcon || ThumbsUp;
      } else if (iconData.provider === "fi") {
        const FiIcon = (FiIcons as any)[iconData.name];
        return FiIcon || ThumbsUp;
      }
    }

    // Default fallback
    return ThumbsUp;
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-5 pointer-events-none">
        <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png" alt="1 Stop Pest Control LLC" width={500} height={500} className="h-[600px] w-auto" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            </div>
            <p className="text-lg mb-8">{description}</p>

            <div className="grid grid-cols-1 gap-6">
              {reasons.map((reason: any, index: number) => {
                const ReasonIcon = reason.icon;
                return (
                  <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="bg-pest-red rounded-full p-2 text-white flex-shrink-0">{typeof ReasonIcon === "function" ? <ReasonIcon className="h-6 w-6" /> : <ThumbsUp className="h-6 w-6" />}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{reason.title}</h3>
                      <p className="text-gray-700">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src={featuredImageUrl} alt="1 Stop Pest Control Technician" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-6 rounded-lg shadow-lg max-w-[220px]">
              <p className="font-bold text-xl">{badgeText}</p>
            </div>
            <div className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg">
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png" alt="1 Stop Pest Control LLC" width={80} height={80} className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
