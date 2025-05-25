"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  return (
    <section className="relative bg-cover bg-center min-h-[500px] md:min-h-[600px] h-[calc(100vh-50px)] md:h-auto  flex flex-col justify-center" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-12 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-full inline-block">
              <Image src={logoUrl} alt="1 Stop Pest Control LLC" width={180} height={90} className="w-[140px] md:w-[180px] h-[70px] md:h-[90px] object-contain" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-snug">{title}</h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-8 px-2 md:px-0">{description}</p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90 text-white rounded-full px-6 py-5 md:px-8 md:py-6 text-base md:text-lg">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Graphic Elements with Swiper */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm py-3 px-3 md:py-4 md:px-6 rounded-t-lg">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              breakpoints={{
                768: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
              }}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              loop={true}
              className="pest-icons-swiper"
            >
              {data?.pestIcons.map((pest: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center text-white text-center">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-2 overflow-hidden rounded-md">
                      <Image src={pest.iconUrl} alt={`${pest.name} Control`} width={40} height={40} className="object-cover w-[40px] h-[40px]" loading="eager" />
                    </div>
                    <span className="text-xs md:text-sm font-medium truncate w-full">{pest.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pest-icons-swiper {
          padding: 0 30px;
        }
      `}</style>
    </section>
  );
}
