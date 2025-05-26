import Image from "next/image";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    _id?: string;
    name?: string;
    testimonial?: string;
    company?: string;
    imageUrl?: string;
    rating?: number;
    days?: number;
    date?: string;
    button?: string;
    link?: string;
    externalLink?: string;
  } | null;
}

const RenderStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />
      ))}
    </div>
  );
};

// Function to calculate days since the testimonial date
const calculateDaysAgo = (dateString: string): number => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function TestimonialModal({ isOpen, onClose, testimonial }: TestimonialModalProps) {
  if (!isOpen || !testimonial) return null;

  const getInitial = (name?: string) => {
    return name ? name.charAt(0).toLowerCase() : "?";
  };

  const getRandomColor = (id?: string) => {
    const colors = ["#e53e3e", "#dd6b20", "#d69e2e", "#38a169", "#3182ce", "#805ad5", "#d53f8c"];
    const index = id ? id.charCodeAt(0) % colors.length : 0;
    return colors[index || 0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 testimonial-modal">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg testimonial-modal-content">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6">
          {/* Header: Avatar, Name, Verified, Days Ago */}
          {testimonial.externalLink ? (
            <a href={testimonial.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mr-3" style={{ backgroundColor: getRandomColor(testimonial._id) }}>
                {getInitial(testimonial.name)}
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">{testimonial.name || "Customer"}</span>
                  <Image src="/images/icons8-verified-badge-48.png" alt="Verified" width={18} height={18} className="object-contain" />
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{calculateDaysAgo(testimonial.date || "")} days ago on</span>
                  <Image src="/images/google-logo-transparent.png" alt="Google" width={60} height={20} className="object-contain ml-1" />
                </div>
              </div>
            </a>
          ) : (
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mr-3" style={{ backgroundColor: getRandomColor(testimonial._id) }}>
                {getInitial(testimonial.name)}
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">{testimonial.name || "Customer"}</span>
                  <Image src="/images/icons8-verified-badge-48.png" alt="Verified" width={18} height={18} className="object-contain" />
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{calculateDaysAgo(testimonial.date || "")} days ago on</span>
                  <Image src="/images/google-logo-transparent.png" alt="Google" width={60} height={20} className="object-contain ml-1" />
                </div>
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="mb-4">{testimonial.rating && <RenderStars rating={testimonial.rating} />}</div>

          {/* Full Testimonial */}
          {testimonial.testimonial && <p className="text-lg">{testimonial.testimonial}</p>}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
            Close
          </Button>
        </div>

        {testimonial.button && testimonial.link && (
          <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-500 hover:underline">
            {testimonial.button}
          </a>
        )}
      </div>
    </div>
  );
}
