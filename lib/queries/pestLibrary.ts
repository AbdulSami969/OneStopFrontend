import { groq } from "next-sanity";

export const pestLibraryQuery = groq`*[_type == "pestMain"][0]{
  title,
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
  pestGridSection {
    heading,
    description,
    pests[]-> {
      _id,
      name,
      "slug": slug.current,
      "icon": icon.asset->url,
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
  identificationSection {
    heading,
    description,
    primaryButton {
      text,
      path
    },
    secondaryButton {
      text,
      path
    },
    "galleryImages": galleryImages[].asset->url,
    badgeText
  },
  preventionSection {
    heading,
    description,
    tipCategories[] {
      title,
      tips
    },
    ctaButton {
      text,
      path
    }
  },
  ctaSection {
    heading,
    description,
    primaryButton {
      text,
      path
    },
    secondaryButton {
      text,
      path
    }
  }
}`;

export const pestsQuery = groq`*[_type == "pest"]{
  _id,
  name,
  "slug": slug.current,
  "icon": icon.asset->url,
  "image": heroSection.heroImage.asset->url,
  heroSection {
    description
  }
}`;
