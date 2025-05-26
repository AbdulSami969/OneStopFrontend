import { client } from "../sanity.client";
import { Service } from "../types/services";
import { groq } from "next-sanity";

// Fetch entire homepage data
export async function getHomepage() {
  try {
    return client.fetch(groq`
      *[_type == "homepage"][0] {
        // Hero Section
        heroSection {
          title,
          description,
          "backgroundImageUrl": backgroundImage.asset->url,
          "logoImageUrl": logoImage.asset->url,
          ctaButton {
            text,
            link
          },
          pestIcons[] {
            "iconUrl": icon.asset->url,
            name
          }
        },
        
        // Services Section
        servicesSection {
          title,
          description,
          services[]-> {
          ...,
            _id,
            title,
            slug,
            "imageUrl": heroSection.heroImage.asset->url,
            featured
          }
        },
        
        // Why Choose Us Section
        whyChooseUsSection {
          title,
          description,
          "featuredImageUrl": featuredImage.asset->url,
          badgeText,
          reasons[] {
            icon,
            title,
            description
          }
        },
        
        // Pest Gallery Section
        pestGallerySection {
          title,
          description,
          pests[]-> {
            _id,
            name,
            slug,
            "iconUrl": icon.asset->url,
              heroSection {
        "image": heroImage.asset->url,
        headline,
        description
      },
      benefitsSection{
     "featuredImageUrl": featuredImage.asset->url,
      
      },
          }
        },
        
        // Testimonials Section
        // Testimonials Section
    testimonialsSection {
    ...,
      title,
      testimonials[]->{
      ...,
        _id,
        name,
        testimonial,
        company,
        rating,
        externalLink,
        "imageUrl": image.asset->url
      },
      ctaButton {
            text,
            link
          }
    },
        
        // Service Areas Section
        serviceAreasSection {
          title,
          description,
          areas
        },
        
        // CTA Section
        ctaSection {
          title,
          description,
          "logoImageUrl": logoImage.asset->url,
          icon,
          primaryButton {
            text,
            link
          },
          secondaryButton {
            text,
            link
          }
        }
      }
    `);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

// Fetch homepage hero content
export async function getHomepageHero() {
  try {
    return client.fetch(`*[_type == "homepage"][0] {
      hero {
        title,
        subtitle,
        description,
        image,
        cta {
          primaryText,
          primaryUrl,
          secondaryText,
          secondaryUrl
        }
      }
    }`);
  } catch (error) {
    console.error("Error fetching homepage hero:", error);
    return null;
  }
}

// Fetch homepage testimonials
export async function getHomepageTestimonials() {
  try {
    return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)[0...3] {
      name,
      location,
      quote,
      rating,
      image
    }`);
  } catch (error) {
    console.error("Error fetching homepage testimonials:", error);
    return [];
  }
}

// Get featured services for homepage
export async function getHomepageFeaturedServices(): Promise<Service[]> {
  try {
    return client.fetch(
      `*[_type == "service" && featured == true] | order(title asc)[0...3] {
        title,
        slug,
        heroSection {
          heroImage,
          headline,
          description
        }
      }`
    );
  } catch (error) {
    console.error("Error fetching featured services for homepage:", error);
    return [];
  }
}
