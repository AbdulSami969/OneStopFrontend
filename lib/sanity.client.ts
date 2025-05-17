import { createClient } from "next-sanity";

const projectId = "s6dg2z72";
const dataset = "production";
const apiVersion = "2023-05-03";

// Create Sanity client to be used across the application
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Create a separate client for write operations with a token
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: "skMZD8bY5Uu13HXOkL1AqnEjw2JESpsL1KNSRwHIGHoYen02n12XeSRGAj7VieYrbxSl9UAoClEmdvgy6mMte4EhUjyLbmykwEAHcMPPC9OCy8xZ3JTgMyVsdKmSVEVPeGojYN2VRGxEz1ZTq21D5sidmTG6kCX58MrM9X12zha2b02L9SOL",
  useCdn: false, // Don't use CDN for write operations
});
