import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client/sanityClient";

import { MENU_CATEGORY_NAME, type MenuCategory } from "@/sanity/schemas";

export const allMenuCategoriesQuery = groq`
*[_type == "${MENU_CATEGORY_NAME}"] | order(placement asc)
`;

export async function getAllMenuCategories(): Promise<MenuCategory[]> {
  if (!sanityClient) return [];

  return await sanityClient.fetch(allMenuCategoriesQuery);
}
