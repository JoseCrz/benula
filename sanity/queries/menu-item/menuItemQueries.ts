import { groq } from "next-sanity";
import { menuCategoryType, type MenuItem } from "@/sanity/schemas";
import { sanityClient } from "@/sanity/client/sanityClient";

const menuItemSlugsQuery = groq`
  *[_type == 'menuItem' && defined(slug.current)][].slug.current
`;

export async function getAllMenuItemSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(menuItemSlugsQuery)) || [];
}

const menuItemBySlugQuery = groq`
  *[_type == 'menuItem' && slug.current == $slug][0]
`;

export async function getMenuItemBySlug(slug: string): Promise<MenuItem> {
  if (!sanityClient) return {} as any;

  return await sanityClient.fetch(menuItemBySlugQuery, { slug });
}

const latestMenuItemsWithDetailPageQuery = groq`
*[_type == "menuItem" && defined(slug.current)][0...6] | order(_updatedAt desc)
`;

export async function getLatestMenuItemsWithDetail(): Promise<MenuItem[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(latestMenuItemsWithDetailPageQuery)) || [];
}
