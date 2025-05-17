import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Pest } from "../types/pests";

// Fetch all pests
export async function getPests(): Promise<Pest[]> {
  try {
    console.log("Fetching pests from Sanity...");
    const pests = await client.fetch(
      `*[_type == "pest"] | order(name asc) {
        _id,
        name,
        slug,
        icon,
        heroSection {
          heroImage,
          headline,
          description
        }
      }`
    );
    console.log(`Found ${pests?.length || 0} pests`);
    return pests || [];
  } catch (error) {
    console.error("Error fetching pests:", error);
    return [];
  }
}

// Fetch a single pest by slug
export async function getPest(slug: string): Promise<Pest | null> {
  try {
    console.log("Fetching pest from Sanity...", slug);
    const pest = await client.fetch(
      groq`*[_type == "pest" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        icon,
        heroSection {
          heroImage,
          headline,
          description
        },
        identificationSection {
          description,
          closeupImage,
          infestationSigns,
          commonSpecies,
          ourSolution
        },
        benefitsSection {
          title,
          description,
          benefits[] {
            icon,
            title,
            description
          },
          ctaButton {
            text,
            path
          },
          featuredImage,
          imageBadge,
          statCallout {
            icon,
            statNumber,
            statDescription
          }
        },
        processSection {
          title,
          steps[] {
            stepNumber,
            title,
            description
          }
        },
        ctaSection {
          title,
          description,
          button {
            text,
            path
          }
        },
        healthRisksSection {
          title,
          risks
        },
        preventionSection {
          title,
          tips
        },
        seo
      }`,
      { slug }
    );
    return pest;
  } catch (error) {
    console.error(`Error fetching pest with slug ${slug}:`, error);
    return null;
  }
}

// Fetch featured pests (if you want to display some pests on the homepage)
export async function getFeaturedPests(limit: number = 4): Promise<Pest[]> {
  try {
    return client.fetch(
      `*[_type == "pest"] | order(name asc)[0...${limit}] {
        _id,
        name,
        slug,
        icon,
        heroSection {
          heroImage,
          headline,
          description
        }
      }`
    );
  } catch (error) {
    console.error("Error fetching featured pests:", error);
    return [];
  }
}

// Get all pest slugs for static generation
export async function getAllPestSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(`*[_type == "pest"].slug.current`);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching pest slugs:", error);
    return [];
  }
}
