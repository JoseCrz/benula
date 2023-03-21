import { defineType, defineField } from "sanity";
import { BsFillPersonBadgeFill } from "react-icons/bs";

export type StaffMember = {
  _id: string;
  name: string;
  role: string;
  image: {
    _key: string;
    _type: "image";
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  };
};

export const staffMemberType = defineType({
  name: "staffMember",
  title: "miembro del staff",
  type: "document",
  icon: BsFillPersonBadgeFill,
  fields: [
    defineField({
      name: "name",
      title: "nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "rol",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "imagen",
      type: "image",
      fields: [
        { name: "alt", title: "descripción de la imágen", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
