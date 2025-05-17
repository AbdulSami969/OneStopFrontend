import { groq } from "next-sanity";

export const commercialPageQuery = groq`
  *[_type == "commercial"][0] {
    _id,
    title,
    // Hero Section
    heroSection {
      heading_title,
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
    // Main Content Section
    mainContentSection {
      heading,
      description,
      features[] {
        title,
        icon,
        description
      }
    },
    // Industries Section
    industriesSection {
      heading,
      industries[] {
        title,
        "imageUrl": image.asset->url,
        description
      }
    },
    // Services Section
    servicesSection {
      heading,
      services[] {
        title,
        description
      }
    },
    // Process Section
    processSection {
      heading,
      steps[] {
        number,
        title,
        description
      }
    },
    // Why Choose Us Section
    whyChooseUsSection {
      heading,
      features[] {
        title,
        description
      },
      cta_button {
        text,
        path
      }
    },
    // Testimonials Section
    testimonialsSection {
      heading,
      testimonials[]->{
        _id,
        name,
        testimonial,
        company,
        rating,
        externalLink,
        "imageUrl": image.asset->url
      }
    },
    // Service Areas Section
    serviceAreasSection {
      heading,
      description,
      areas[]
    },
    // FAQ Section
    faqSection {
      heading,
      faqs[]->{
        _id,
        question,
        answer
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
