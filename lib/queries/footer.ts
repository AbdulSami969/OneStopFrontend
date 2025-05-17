import { groq } from "next-sanity";
import { client } from "../sanity.client";

export async function getFooterData() {
  try {
    return client.fetch(
      groq`*[_type == "footer"][0] {
        companyInfo {
          logo,
          description,
          socialLinks[] {
            platform,
            url,
            icon
          }
        },
        quickLinks {
          title,
          links[] {
            text,
            url
          }
        },
        servicesLinks {
          title,
          links[] {
            text,
            url
          }
        },
        contactInfo {
          title,
          phone,
          phoneLink,
          email,
          emailLink,
          address
        },
        copyright {
          text,
          showLogo
        }
      }`
    );
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}
