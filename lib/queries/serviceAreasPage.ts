import { client } from "../sanity.client";
import { groq } from "next-sanity";

// Fetch the service areas page data
export async function getServiceAreasPage() {
  try {
    return client.fetch(groq`
      *[_type == "serviceAreasPage"][0] {
        // Hero Section
        heroSection {
          headline,
          subheadline,
          "backgroundImageUrl": backgroundImage.asset->url
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
          subheading,
          description,
          serviceAreas[] {
            county,
            cities
          },
          contactCallout {
            heading,
            description,
            primaryButton {
              text,
              link
            },
            secondaryButton {
              text,
              link
            }
          }
        },
        
        // Map Section
        mapSection {
          heading,
          "mapImageUrl": mapImage.asset->url,
          overlayBox {
            heading,
            description,
            buttonText,
            buttonLink
          }
        },
        
        // CTA Section
        ctaSection {
          heading,
          description,
          primaryButton {
            text,
            link
          },
          secondaryButton {
            text,
            link
          }
        },
        
        // SEO Settings
        seo {
          metaTitle,
          metaDescription,
          "openGraphImageUrl": openGraphImage.asset->url
        }
      }
    `);
  } catch (error) {
    console.error("Error fetching service areas page data:", error);
    return null;
  }
}
