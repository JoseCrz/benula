import { defineType, defineField } from "sanity";
import { BsFillStarFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

export type Dessert = {
  _id: string;
  coverImage: {
    _key: string;
    _type: "image";
    alt: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  price: string;
  collaborator: string;
  date: string;
  excerpt: string;
  blogPost: any;
};

export type DessertBlogImage = {
  _key: string;
  _type: "image";
  alt?: string;
  caption?: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export const dessertType = defineType({
  name: "dessert",
  title: "postre del mes",
  type: "document",
  icon: BsFillStarFill,
  fields: [
    defineField({
      name: "coverImage",
      title: "imagen principal",
      type: "image",
      validation: (rule) => rule.required(),
      fields: [
        { name: "alt", title: "descripción de la imágen", type: "string" },
      ],
    }),
    defineField({
      name: "name",
      title: "nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: "price",
      title: "precio",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collaborator",
      title: "colaborador",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "fecha",
      type: "date",
      validation: (rule) => rule.required(),
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "excerpt",
      title: "descripción breve",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blogPost",
      title: "blog",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          name: "image",
          title: "agregar imagen",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "descripción de la imagen",
            },
            {
              name: "caption",
              type: "string",
              title: "pie de foto",
            },
          ],
          icon: BiImageAdd,
        },
      ],
    }),
  ],
});
