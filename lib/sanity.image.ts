import { client } from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to get image URL for a Sanity image asset
export function urlForImage(source: any) {
  // Return empty string if source is not provided
  if (!source) return "";

  // Return the image URL if source is provided
  return builder.image(source);
}
