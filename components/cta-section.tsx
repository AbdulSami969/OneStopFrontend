import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import * as Icons from "react-icons/fa";
import * as MdiIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";

// Define props type
type CTASectionProps = {
  data?: any;
};

export default function CTASection({ data }: CTASectionProps = {}) {
  // Use data from Sanity if available, otherwise use default values
  const title = data?.title || "Ready to Get Rid of Pests for Good?";
  const description = data?.description || "Contact 1 Stop Pest Control today for a free quote and take the first step towards a pest-free environment.";
  const logoUrl = data?.logoImageUrl || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-u661-QdB7JOSS3VcbRtpK4WMnZ5YxDVmWpe.png";

  // Primary button data
  const primaryButtonText = data?.primaryButton?.text || "Get a Free Quote";
  const primaryButtonLink = data?.primaryButton?.link || "/contact";

  // Secondary button data
  const secondaryButtonText = data?.secondaryButton?.text || "518-728-5589";
  const secondaryButtonLink = data?.secondaryButton?.link || "tel:5187285589";

  // Render icon if available
  const renderIcon = () => {
    const iconData = data?.icon;

    if (!iconData) return null;

    // Handle icon picker format
    if (iconData._type === "iconPicker") {
      if (iconData.provider === "fa") {
        const FaIcon = (Icons as any)[iconData.name];
        return FaIcon ? <FaIcon className="h-8 w-8 text-white mb-4" /> : null;
      } else if (iconData.provider === "mdi") {
        const MdiIcon = (MdiIcons as any)[iconData.name];
        return MdiIcon ? <MdiIcon className="h-8 w-8 text-white mb-4" /> : null;
      } else if (iconData.provider === "hi") {
        const HiIcon = (HiIcons as any)[iconData.name];
        return HiIcon ? <HiIcon className="h-8 w-8 text-white mb-4" /> : null;
      } else if (iconData.provider === "fi") {
        const FiIcon = (FiIcons as any)[iconData.name];
        return FiIcon ? <FiIcon className="h-8 w-8 text-white mb-4" /> : null;
      }
    }

    return null;
  };

  return (
    <section className="py-20 bg-pest-red text-white relative overflow-hidden">
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-10 pointer-events-none">
        <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={400} height={400} className="h-[500px] w-auto" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 p-3 rounded-full inline-block">
              {renderIcon()}
              <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={80} height={80} className="h-16 w-auto" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white rounded-full px-8 py-6 text-lg">
              <Link href={primaryButtonLink} className="flex items-center">
                <span>{primaryButtonText}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-6 text-lg">
              <Link href={secondaryButtonLink} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>{secondaryButtonText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
