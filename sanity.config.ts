import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { SANITY_PROJECT_ID, SANITY_DATASET } from "./lib/sanity.api";

export default defineConfig({
  basePath: "/studio",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  title: "Benúla",
  plugins: [deskTool()],
});
