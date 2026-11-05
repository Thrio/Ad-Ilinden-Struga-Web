import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "ad-ilinden-struga",
  title: "AD Ilinden Struga",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "localmoc",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
