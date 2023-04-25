import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { dessertType, type Dessert } from "@/sanity/schemas";

const latestDessertQuery = groq`
  *[_type == "${dessertType.name}"] | order(date desc)[0]
`;

export async function getLatestDessert(): Promise<Dessert> {
  if (!sanityClient) return {} as any;

  return await sanityClient.fetch(latestDessertQuery);
}

const getAllDessertsQuery = groq`
  *[_type == "${dessertType.name}"] | order(date desc)
`;

export async function getAllDeserts(): Promise<Dessert[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(getAllDessertsQuery)) || [];
}

const allDessertSlugsQuery = groq`
  *[_type == "${dessertType.name}" && defined(slug.current)][].slug.current
`;

export async function getAllDessertSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(allDessertSlugsQuery)) || [];
}

const getDessertBySlugQuery = groq`
  *[_type == "${dessertType.name}" && slug.current == $slug][0]
`;

export async function getDessertBySlug(slug: string): Promise<Dessert> {
  if (!sanityClient) return {} as any;

  return await sanityClient.fetch(getDessertBySlugQuery, { slug });
}
