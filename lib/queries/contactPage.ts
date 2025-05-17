import { client } from "../sanity.client";
import { groq } from "next-sanity";

// Fetch entire contact page data
export async function getContactPage() {
  try {
    return client.fetch(groq`
      *[_type == "contactPage"][0] {
        // Header Section
        headerSection {
          headline,
          subheadline
        },
        
        // Contact Information Section
        contactInfoSection {
          headline,
          description,
          contactOptions[] {
            optionType,
            title,
            subtitle,
            icon,
            value,
            link,
            businessHours[] {
              day,
              hours
            }
          },
          emergencyServices {
            title,
            description,
            buttonText,
            buttonLink
          }
        },
        
        // Form Section
        formSection {
          title,
          fields[] {
            name,
            label,
            type,
            placeholder,
            required,
            options,
            width
          },
          submitButton {
            text,
            loadingText
          },
          successMessage,
          errorMessage
        },
        
        // Service Areas Section
        serviceAreasSection {
          title,
          description,
          areas,
          buttonText,
          buttonLink
        },
        
        // CTA Section
        ctaSection {
          title,
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
      }
    `);
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
}
