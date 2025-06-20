import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Award, Users, MapPin, CheckCircle, ThumbsUp } from "lucide-react";
import { client } from "@/lib/sanity.client";
import { aboutPageQuery } from "@/lib/queries/aboutPage";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text-components";

// Define the types for our Sanity data
type AboutPageData = {
  header: {
    title: string;
    subtitle: string;
  };
  ourStory: {
    title: string;
    content: any;
    imageUrl: string;
    companyInfo: {
      logoUrl: string;
      companyName: string;
      serviceArea: string;
    };
    locallyOwnedBadge: {
      text: string;
    };
  };
  mission: {
    title: string;
    description: any;
    values: {
      icon: string;
      title: string;
      description: any;
    }[];
  };
  whyChooseUs: {
    title: string;
    features: {
      title: string;
      description: any;
    }[];
  };
  serviceArea: {
    title: string;
    description: any;
    locations: string[];
    additionalInfo: any;
    contactButton: {
      text: string;
      path: string;
    };
    mapImageUrl: string;
    locallyOwnedBadge: {
      text: string;
    };
  };
  cta: {
    title: string;
    description: any;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
};

export default async function AboutPage() {
  // Fetch the data from Sanity
  const pageData: AboutPageData = await client.fetch(aboutPageQuery);

  // Helper function to render CoreValues icons
  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="h-8 w-8" />;
      case "Award":
        return <Award className="h-8 w-8" />;
      case "Users":
        return <Users className="h-8 w-8" />;
      default:
        return <Shield className="h-8 w-8" />;
    }
  };

  return (
    <>
      {/* Header Section */}
      <section className="bg-white pt-32 sm:pt-12 pb-6">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pest-red">{pageData?.header?.title || "About 1 Stop Pest Control"}</h1>
            <p className="text-xl text-gray-700 mb-0">{pageData?.header?.subtitle || "Your trusted local pest control experts serving the Albany Capital Region since 2018"}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold">{pageData?.ourStory?.title || "Our Story"}</h2>
              </div>
              {pageData?.ourStory?.content ? (
                <div className="prose text-lg">
                  <PortableText value={pageData.ourStory.content} components={portableTextComponents} />
                </div>
              ) : (
                <>
                  <p className="text-lg mb-6">1 Stop Pest Control LLC was founded with a simple mission: to provide effective, affordable pest control solutions to residents and businesses throughout the Albany Capital Region.</p>
                  <p className="text-lg mb-6">As a locally owned and operated company, we understand the unique pest challenges that Albany area residents face. From bed bugs in urban apartments to carpenter ants in suburban homes, we've seen it all and developed specialized treatment methods to address each situation.</p>
                  <p className="text-lg mb-6">What sets us apart is our commitment to using the most effective and environmentally responsible methods available. Our specialty in heat treatment for bed bugs demonstrates our dedication to providing solutions that are both highly effective and safe for your family and pets.</p>
                </>
              )}
              <div className="flex items-center gap-4 mt-8">
                <div className="relative h-20 w-20">
                  <Image src={pageData?.ourStory?.companyInfo?.logoUrl || "/images/1stop-logo.png"} alt={pageData?.ourStory?.companyInfo?.companyName || "1 Stop Pest Control LLC"} fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{pageData?.ourStory?.companyInfo?.companyName || "1 Stop Pest Control LLC"}</h3>
                  <p className="text-gray-600">{pageData?.ourStory?.companyInfo?.serviceArea || "Serving the Albany Capital Region"}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image src={pageData?.ourStory?.imageUrl || "/images/1StopPestAlbany.png"} alt="1 Stop Pest Control Service Vehicle" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">{pageData?.ourStory?.locallyOwnedBadge?.text || "Locally Owned & Operated"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData?.mission?.title || "Our Mission"}</h2>
            {pageData?.mission?.description ? (
              <div className="prose text-xl mx-auto">
                <PortableText value={pageData.mission.description} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-xl">To provide exceptional pest control services that protect our customers' health, property, and peace of mind through effective, environmentally responsible solutions and outstanding customer service.</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageData?.mission?.values && pageData.mission.values.length > 0 ? (
              pageData.mission.values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-pest-red h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">{renderValueIcon(value.icon)}</div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  {value.description ? (
                    <div className="prose">
                      <PortableText value={value.description} components={portableTextComponents} />
                    </div>
                  ) : (
                    <p>No description available</p>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-pest-red h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Protection</h3>
                  <p>We're committed to protecting your home or business from pests that can damage property, spread disease, or cause discomfort.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-pest-red h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p>We strive for excellence in every aspect of our service, from the products and techniques we use to our customer communication.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-pest-red h-16 w-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Community</h3>
                  <p>As members of the Albany community, we're dedicated to making our region a better, healthier place to live and work.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageData?.whyChooseUs?.title || "Why Choose 1 Stop Pest Control?"}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pageData?.whyChooseUs?.features && pageData.whyChooseUs.features.length > 0 ? (
              pageData.whyChooseUs.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    {feature.description ? (
                      <div className="prose text-lg">
                        <PortableText value={feature.description} components={portableTextComponents} />
                      </div>
                    ) : (
                      <p className="text-lg">No description available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Specialized Heat Treatment</h3>
                    <p className="text-lg">Our specialty is eco-friendly bed bug elimination using advanced heat treatment technology that kills bed bugs at all life stages without harmful chemicals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certified Professionals</h3>
                    <p className="text-lg">Our technicians are certified Pest Control Applicators with extensive training and experience in identifying and treating all types of pest problems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comprehensive Solutions</h3>
                    <p className="text-lg">We offer a full range of pest control services for both residential and commercial properties, addressing everything from common household pests to specialized infestations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
                    <p className="text-lg">As a local company, we understand the specific pest challenges in the Albany Capital Region and have developed targeted solutions for our climate and environment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Affordable Quality</h3>
                    <p className="text-lg">We provide high-quality pest control services at competitive prices, with transparent pricing and no hidden fees.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pest-red rounded-full p-3 text-white flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
                    <p className="text-lg">Our commitment to customer satisfaction is reflected in our high ratings and positive reviews from satisfied customers throughout the Albany area.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-gray-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-0.5 bg-pest-red w-12 mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold">{pageData?.serviceArea?.title || "Our Service Area"}</h2>
              </div>

              {pageData?.serviceArea?.description ? (
                <div className="prose text-lg mb-6">
                  <PortableText value={pageData.serviceArea.description} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-lg mb-6">1 Stop Pest Control proudly serves the entire Albany Capital Region, including:</p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-8">
                {pageData?.serviceArea?.locations && pageData.serviceArea.locations.length > 0 ? (
                  pageData.serviceArea.locations.map((location, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>{location}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Albany</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Rensselaer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Troy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Schenectady</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Colonie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Clifton Park</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Latham</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-pest-red" />
                      <span>Delmar</span>
                    </div>
                  </>
                )}
              </div>

              {pageData?.serviceArea?.additionalInfo ? (
                <div className="prose text-lg mb-6">
                  <PortableText value={pageData.serviceArea.additionalInfo} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-lg mb-6">We also serve many other communities throughout the Capital Region. If you don't see your location listed, please contact us to confirm service availability in your area.</p>
              )}

              <Button asChild size="lg" className="bg-pest-red hover:bg-pest-red/90">
                <Link href={pageData?.serviceArea?.contactButton?.path || "/contact"}>{pageData?.serviceArea?.contactButton?.text || "Contact Us Today"}</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src={pageData?.serviceArea?.mapImageUrl || "/albany-ny-skyline.png"} alt="Albany Capital Region Map" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pest-red text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-6 w-6" />
                  <span className="text-xl font-bold">{pageData?.serviceArea?.locallyOwnedBadge?.text || "Locally Owned"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pest-red text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{pageData?.cta?.title || "Ready to Get Started?"}</h2>

            {pageData?.cta?.description ? (
              <div className="prose text-xl mb-8 text-white mx-auto">
                <PortableText value={pageData.cta.description} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-xl mb-8">Contact 1 Stop Pest Control today for a free consultation and take the first step towards a pest-free environment.</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-pest-red hover:bg-gray-100 border-white">
                <Link href={pageData?.cta?.primaryButtonLink || "/contact"}>{pageData?.cta?.primaryButtonText || "Get a Free Quote"}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href={pageData?.cta?.secondaryButtonLink || "tel:5187285589"}>{pageData?.cta?.secondaryButtonText || "Call 518-728-5589"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
