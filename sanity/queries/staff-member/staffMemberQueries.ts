import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";

import { staffMemberType, type StaffMember } from "@/sanity/schemas";

const getStaffMembersQuery = groq`
  *[_type == "${staffMemberType.name}"] | order(date desc)
`;

export async function getAllStaffMembers(): Promise<StaffMember[]> {
  if (!sanityClient) return [];

  return await sanityClient.fetch(getStaffMembersQuery);
}
