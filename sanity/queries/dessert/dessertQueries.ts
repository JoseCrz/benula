import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";

import { dessertType, type Dessert } from "@/sanity/schemas";

const latestDessertsQuery = groq`
  *[_type == "${dessertType.name}"][0...5] | order(date desc)
`;

export async function getLatestDesserts(): Promise<Dessert[]> {
  if (!sanityClient) return [];

  return await sanityClient.fetch(latestDessertsQuery);
}

const getAllDessertsQuery = groq`
  *[_type == "${dessertType.name}"] | order(date desc)
`;

export async function getAllDeserts(): Promise<Dessert[]> {
  if (!sanityClient) return [];

  return (await sanityClient.fetch(getAllDessertsQuery)) || [];
}
