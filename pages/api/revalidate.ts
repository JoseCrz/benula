import type { NextApiRequest, NextApiResponse } from "next";
import { getAllDessertSlugs, getAllMenuItemSlugs } from "@/sanity/queries";
import type {
  Dessert,
  MenuCategory,
  MenuItem,
  StaffMember,
} from "@/sanity/schemas";
import type { SanityDocument } from "sanity";

import { parseBody } from "next-sanity/webhook";
export { config } from "next-sanity/webhook";

export default async function revalidate(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { isValidSignature, body } = await parseBody(
      request,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return response.status(401).send("Invalid signature");
    }

    if (typeof body._id !== "string" || !body._id) {
      const invalidId = "Invalid _id";
      console.error(invalidId, { body });
      return response.status(400).send(invalidId);
    }

    const staleRoutes = await queryStaleRoutes(body as DocumentBody);

    await Promise.all(staleRoutes.map((route) => response.revalidate(route)));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    console.log(updatedRoutes);

    return response.status(200).send(updatedRoutes);
  } catch (error) {
    console.error(error);
    return response.status(500).send(error);
  }
}

interface DocumentBody extends SanityDocument {
  _type: (Dessert | MenuCategory | MenuItem | StaffMember)["_type"];
}

async function queryStaleRoutes(body: DocumentBody): Promise<string[]> {
  switch (body._type) {
    case "dessert":
      return await queryStaleDessertRoutes();
    case "menuItem":
      return await queryStaleMenuItemRoutes();
    case "menuCategory":
      return ["/menu"];
    default:
      return ["/"];
  }
}

async function queryStaleDessertRoutes() {
  const slugs = await getAllDessertSlugs();

  const individualDessertRoutes = slugs.map(
    (slug) => `/postre-del-mes/${slug}`
  );

  return ["/", "/postre-del-mes", ...individualDessertRoutes];
}

async function queryStaleMenuItemRoutes() {
  const slugs = await getAllMenuItemSlugs();

  const individualMenuItemRoutes = slugs.map((slug) => `/menu/${slug}`);

  return ["/", "/menu", ...individualMenuItemRoutes];
}
