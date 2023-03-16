import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { SANITY_PROJECT_ID, SANITY_DATASET } from "./lib/sanity.api";

import { menuCategoryType, menuItemType } from "./schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  title: "Benúla",
  schema: {
    types: [menuCategoryType, menuItemType],
  },
  plugins: [deskTool()],
});
