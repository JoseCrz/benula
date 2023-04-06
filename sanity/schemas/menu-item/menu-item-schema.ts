import { defineField, defineType } from "sanity";
import { IoFastFoodOutline } from "react-icons/io5";

export const MENU_ITEM_NAME = "menuItem";

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
  images: {
    _key: string;
    _type: "image";
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }[];
  description?: string;
  slug?: {
    _type: "slug";
    current: string;
  };
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
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      hidden: ({ document }) => !document?.hasDetailPage,
      name: "slug",
      title: "Slug",
      type: "slug",
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
  ],
});
