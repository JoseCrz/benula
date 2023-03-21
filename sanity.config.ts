import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { SANITY_PROJECT_ID, SANITY_DATASET } from "./sanity/data";
import {
  menuCategoryType,
  menuItemType,
  staffMemberType,
} from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  title: "Benúla",
  schema: {
    types: [menuCategoryType, menuItemType, staffMemberType],
  },
  plugins: [deskTool()],
});
