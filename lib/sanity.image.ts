import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const projectId = "s6dg2z72";
const dataset = "production";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image) => {
  if (!source?.asset?._ref) {
    return "";
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};
