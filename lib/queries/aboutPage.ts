import { groq } from "next-sanity";

export const aboutPageQuery = groq`
  *[_type == "about"][0] {
    _id,
    // Header Section
    header {
      title,
      subtitle
    },
    // Our Story Section
    ourStory {
      title,
      content,
      "imageUrl": image.asset->url,
      companyInfo {
        "logoUrl": logo.asset->url,
        companyName,
        serviceArea
      },
      locallyOwnedBadge {
        text
      }
    },
    // Mission Section
    mission {
      title,
      description,
      values[] {
        icon,
        title,
        description
      }
    },
    // Why Choose Us Section
    whyChooseUs {
      title,
      features[] {
        title,
        description
      }
    },
    // Service Area Section
    serviceArea {
      title,
      description,
      locations,
      additionalInfo,
      contactButton {
        text,
        path
      },
      "mapImageUrl": mapImage.asset->url,
      locallyOwnedBadge {
        text
      }
    },
    // CTA Section
    cta {
      title,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }
  }
`;
