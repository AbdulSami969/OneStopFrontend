import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to extract icon type from Sanity image URL
export function getPestIconTypeFromUrl(iconUrl: string): string {
  if (!iconUrl) return "ant"; // Default icon

  // Try to extract the pest type from the URL
  if (iconUrl.includes("bedbug")) return "bedbug";
  if (iconUrl.includes("ant")) return "ant";
  if (iconUrl.includes("cockroach")) return "cockroach";
  if (iconUrl.includes("mouse") || iconUrl.includes("rat") || iconUrl.includes("rodent")) return "mouse";
  if (iconUrl.includes("spider")) return "spider";
  if (iconUrl.includes("wasp") || iconUrl.includes("hornet")) return "wasp";

  // Default fallback
  return "ant";
}
