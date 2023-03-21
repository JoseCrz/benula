import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";

import { MENU_CATEGORY_NAME, type MenuCategory } from "@/sanity/schemas";

const allMenuCategoriesQuery = groq`
*[_type == "${MENU_CATEGORY_NAME}"] | order(placement asc) {
  _id, 
  name,
  placement,
  availability,
  menuItems[]->{_id, name, price, excerpt, options, slug}
}
`;

export async function getAllMenuCategories(): Promise<MenuCategory[]> {
  if (!sanityClient) return [];

  return await sanityClient.fetch(allMenuCategoriesQuery);
}
