import { groq } from "next-sanity";
import { menuCategoryType, type MenuItem } from "@/sanity/schemas";
import { sanityClient } from "@/sanity/client/sanityClient";

const menuItemSlugsQuery = groq`
  *[_type == 'menuItem' && hasDetailPage == true &&  defined(slug.current)][].slug.current
`;

export async function getAllMenuItemSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(menuItemSlugsQuery)) || [];
}

const menuItemBySlugQuery = groq`
  *[_type == 'menuItem' && hasDetailPage == true && slug.current == $slug][0]
`;

export async function getMenuItemBySlug(slug: string): Promise<MenuItem> {
  if (!sanityClient) return {} as any;

  return await sanityClient.fetch(menuItemBySlugQuery, { slug });
}

const menuItemsFeaturedQuery = groq`
*[_type == "menuItem" && isFeatured == true && defined(slug.current)] | order(_updatedAt desc)
`;

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(menuItemsFeaturedQuery)) || [];
}

const menuItemsInCarouselQuery = groq`
*[_type == "menuItem" && isInCarousel == true && defined(slug.current)] | order(_updatedAt desc)
`;

export async function getMenuItemsInCarousel(): Promise<MenuItem[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(menuItemsInCarouselQuery)) || [];
}
