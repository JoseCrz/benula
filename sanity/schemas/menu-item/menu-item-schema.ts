import { defineField, defineType } from "sanity";
import { IoFastFoodOutline } from "react-icons/io5";

export const MENU_ITEM_NAME = "menuItem";

type SanityImage = {
  _key: string;
  _type: "image";
  asset?: {
    _ref: string;
    _type: string;
  };
  alt: string;
};

export type MenuItem = {
  _id: string;
  _type: "menuItem";
  name: string;
  price?: number;
  excerpt: string;
  hasOptions: boolean;
  options?: {
    optionPrice: number;
    optionDescription: string;
  }[];
  hasDetailPage: boolean;
  images: (SanityImage | undefined)[];
  description?: string;
  slug?: {
    _type: "slug";
    current: string;
  };
  isFeatured?: boolean;
};

export const menuItemType = defineType({
  name: MENU_ITEM_NAME,
  title: "Menu Item",
  type: "document",
  icon: IoFastFoodOutline,
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "precio",
      type: "number",
    }),
    defineField({
      name: "excerpt",
      title: "descripción breve",
      type: "text",
    }),
    defineField({
      name: "hasOptions",
      title: "agregar opciones",
      type: "boolean",
      initialValue: false,
      description:
        "Al indicar que el item tiene opciones es importante que todos los campos de abajo queden llenados, de lo contrario no se podrá actualizar la página.",
    }),
    defineField({
      hidden: ({ document }) => !document?.hasOptions,
      name: "options",
      title: "Opciones",
      type: "array",
      of: [
        {
          name: "option",
          title: "opción",
          type: "object",
          fields: [
            {
              name: "optionPrice",
              title: "precio",
              type: "number",
            },
            {
              name: "optionDescription",
              title: "descripción",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "hasDetailPage",
      title: "agregar página de detalle",
      description:
        "Al agregar una página de detalle al item es importante que todos los campos de abajo queden llenados, de lo contrario no se podrá actualizar la página.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      hidden: ({ document }) => !document?.hasDetailPage,
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Asegurate de no dejar espacios en blanco al principio o al final del slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      hidden: ({ document }) => !document?.hasDetailPage,
      name: "description",
      title: "descripción larga",
      type: "text",
    }),
    defineField({
      hidden: ({ document }) => !document?.hasDetailPage,
      name: "images",
      title: "imagenes",
      description:
        'Es importante que todas las imagenes sean "validas", lo que significa que ninguna puede quedar cómo "untitled", de lo contrario no se podrá actualizar la página.',
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            { name: "alt", type: "string", title: "Descripción de la imagen" },
          ],
        },
      ],
    }),

    defineField({
      hidden: ({ document }) => !document?.hasDetailPage,
      name: "isFeatured",
      type: "boolean",
      title: "destacar",
      initialValue: false,
    }),
  ],
});
