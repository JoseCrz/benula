import { groq } from "next-sanity";
import type { MenuItem } from "@/sanity/schemas";
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
