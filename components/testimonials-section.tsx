"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialModal from "./testimonial-modal";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialReference {
  _id: string;
  name?: string;
  testimonial?: string;
  company?: string;
  imageUrl?: string;
  rating?: number;
  externalLink?: string;
  days?: number;
  date?: string;
}

interface TestimonialsSectionProps {
  heading?: string;
  testimonials?: TestimonialReference[];
  button?: string;
  link?: string;
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

export default function TestimonialsSection({ heading, testimonials, button, link }: TestimonialsSectionProps) {
  console.log(button, link);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialReference | null>(null);

  const handleReadMore = (testimonial: TestimonialReference) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getInitial = (name?: string) => {
    return name ? name.charAt(0).toLowerCase() : "?";
  };

  const getRandomColor = (id: string) => {
    const colors = ["#e53e3e", "#dd6b20", "#d69e2e", "#38a169", "#3182ce", "#805ad5", "#d53f8c"];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section className="py-16 bg-gray-light">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{heading}</h2>}
          <div className="flex justify-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="testimonials-swiper"
            style={{ paddingBottom: "40px" }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white mx-10 sm:mx-0 p-6 rounded-lg shadow-md h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  {/* Header: Avatar, Name, Verified, Days Ago */}
                  {testimonial.externalLink ? (
                    <a href={testimonial.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center mb-3">
                      {testimonial.imageUrl ? (
                        <div className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden bg-gray-200 border-2 border-pest-red mr-3 hover:shadow-lg transition-shadow duration-300">
                          <Image src={testimonial.imageUrl} alt={testimonial.name || "Customer"} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer font-medium mr-3 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: getRandomColor(testimonial._id) }}>
                          {getInitial(testimonial.name)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                          <span className="font-medium mr-1 text-sm">{testimonial.name || "Customer"}</span>
                          <Image src="/images/icons8-verified-badge-48.png" alt="Verified" width={16} height={16} className="object-contain" />
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>{calculateDaysAgo(testimonial.date || "")} days ago on</span>
                          <Image src="/images/google-logo-transparent.png" alt="Google" width={50} height={16} className="object-contain ml-1" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center mb-3">
                      {testimonial.imageUrl ? (
                        <div className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden bg-gray-200 border-2 border-pest-red mr-3 hover:shadow-lg transition-shadow duration-300">
                          <Image src={testimonial.imageUrl} alt={testimonial.name || "Customer"} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer font-medium mr-3 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: getRandomColor(testimonial._id) }}>
                          {getInitial(testimonial.name)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                          <span className="font-medium mr-1 text-sm">{testimonial.name || "Customer"}</span>
                          <Image src="/images/icons8-verified-badge-48.png" alt="Verified" width={16} height={16} className="object-contain" />
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>{calculateDaysAgo(testimonial.date || "")} days ago on</span>
                          <Image src="/images/google-logo-transparent.png" alt="Google" width={50} height={16} className="object-contain ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating Stars */}
                  <div className="mb-2">{testimonial.rating && <RenderStars rating={testimonial.rating} />}</div>

                  {/* Testimonial Text */}
                  <div className="flex-grow">
                    {testimonial.testimonial && (
                      <p className="text-sm">
                        {truncateText(testimonial.testimonial)}
                        {testimonial.testimonial.length > 100 && (
                          <button onClick={() => handleReadMore(testimonial)} className="text-blue-500 hover:underline ml-1 font-medium">
                            Read more
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center">No testimonials to display at this time.</p>
        )}
        {button && link && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-pest-red text-pest-red hover:bg-pest-red/10">
              <Link href={link} target="_blank">
                {button}
              </Link>
            </Button>
          </div>
        )}
      </div>

      <TestimonialModal isOpen={modalOpen} onClose={closeModal} testimonial={selectedTestimonial} />
    </section>
  );
}
