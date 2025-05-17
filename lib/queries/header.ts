import { groq } from "next-sanity";
import { client } from "../sanity.client";

export async function getHeaderData() {
  try {
    return client.fetch(
      groq`*[_type == "header"][0] {
        logo,
        phoneInfo {
          displayText,
          phoneNumber,
          phoneLink
        },
        topNavigation[] {
          name,
          href
        },
        mainNavigation[] {
          name,
          href
        },
        requestServiceButton {
          text,
          href
        }
      }`
    );
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}
