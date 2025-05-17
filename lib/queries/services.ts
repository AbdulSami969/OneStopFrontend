import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Service } from "../types/services";

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    console.log("Fetching services from Sanity...");
    const services = await client.fetch(
      `*[_type == "service"] | order(title asc) {
        title,
        slug,
        featured,
        heroSection {
          heroImage,
          headline,
          description
        }
      }`
    );
    console.log(`Found ${services?.length || 0} services`);
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch a single service by slug
export async function getService(slug: string): Promise<Service | null> {
  try {
    console.log("Fetching service from Sanity...", slug);
    const service = await client.fetch(
      groq`*[_type == "service" && slug.current == $slug][0] {
        title,
        slug,
        heroSection {
          heroImage,
          headline,
          description
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
          icon,
          title,
          description,
          button {
            text,
            path
          }
        },
        seo
      }`,
      { slug }
    );
    return service;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

// Fetch featured services
export async function getFeaturedServices(): Promise<Service[]> {
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
    console.error("Error fetching featured services:", error);
    return [];
  }
}
