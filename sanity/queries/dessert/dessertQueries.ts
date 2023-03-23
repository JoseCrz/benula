import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";

import { dessertType, type Dessert } from "@/sanity/schemas";

const latestDessertQuery = groq`
*[_type == "${dessertType.name}"] | order(date desc) [0]
`;

export async function getLatestDessert(): Promise<Dessert> {
  if (!sanityClient) return {} as any;

  return await sanityClient.fetch(latestDessertQuery);
}
