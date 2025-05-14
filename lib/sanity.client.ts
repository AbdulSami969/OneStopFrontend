import { createClient } from "next-sanity";

const projectId = "s6dg2z72";
const dataset = "production";
const apiVersion = "2022-03-25";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true for production
});

// Fetch all services
export async function getServices() {
  return client.fetch(
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
}

// Fetch a single service by slug
export async function getService(slug: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
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
}

// Fetch featured services
export async function getFeaturedServices() {
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
}
