import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";

import { menuCategoryType, type MenuCategory } from "@/sanity/schemas";

const allMenuCategoriesQuery = groq`
*[_type == "${menuCategoryType.name}"] | order(placement asc) {
  _id, 
  name,
  placement,
  availability,
  hasLimitedAvailability,
  categoryItems[]->
}
`;

export async function getAllMenuCategories(): Promise<MenuCategory[]> {
  if (!sanityClient) return [];

  return await sanityClient.fetch(allMenuCategoriesQuery);
}
