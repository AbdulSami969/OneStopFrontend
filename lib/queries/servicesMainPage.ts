import { groq } from "next-sanity";

export const servicesMainPageQuery = groq`
  *[_type == "servicesMain"][0] {
    _id,
    title,
    // Hero Section
    heroSection {
      heading,
      subheading,
      description,
      "backgroundImageUrl": backgroundImage.asset->url,
      scheduleButton {
        text,
        path
      },
      contact_button {
        text,
        path
      }
    },
    // Review Banner
    reviewBanner {
      text,
      rating,
      google_review_button {
        text,
        external_path
      }
    },
    // Introduction Section
    introSection {
      heading,
      content, // Portable Text
      "imageUrl": image.asset->url,
      contact_button {
        text,
        path
      },
      calloutText
    },
    // Services Section
    servicesSection {
      heading,
      description,
      services[]->{
        _id,
        title,
        slug,
        heroSection {
          "heroImageUrl": heroImage.asset->url,
          description
        }
      }
    },
    // Process Section
    processSection {
      heading,
      description,
      steps[] {
        title,
        description,
        features[]
      }
    },
    // Testimonials Section
    testimonialsSection {
      heading,
      testimonials[]->{
        _id,
        rating,
        name,
        testimonial,
        company,
        "imageUrl": image.asset->url
      }
    },
    // Service Areas Section
    serviceAreasSection {
      heading,
      description,
      areas[],
      contact_button {
        text,
        path
      },
      "imageUrl": image.asset->url,
      calloutText
    },
    // FAQ Section
    faqSection {
      heading,
      description,
      faqs[]->{
        _id,
        question, // Assuming 'question' field in faq schema
        answer // Assuming 'answer' field in faq schema
      }
    },
    // CTA Section
    ctaSection {
      heading,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }
  }
`;
