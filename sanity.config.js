import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./lib/schemas/schema";
import structure from "./sanity.structure";

export default defineConfig({
  name: "pest-control",
  title: "1 Stop Pest Control",
  projectId: "s6dg2z72",
  dataset: "production",
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemas.types,
  },
});
