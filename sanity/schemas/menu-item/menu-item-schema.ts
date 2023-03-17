import { defineField, defineType } from "sanity";
import { IoFastFoodOutline } from "react-icons/io5";

export const menuItemType = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  icon: IoFastFoodOutline,
  fields: [
    defineField({
      name: "menuCategory",
      title: "categoria",
      type: "reference",
      to: {
        type: "menuCategory",
      },
    }),

    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "precio",
      type: "number",
    }),
    defineField({
      name: "images",
      title: "imagenes",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "shouldAddOptions",
      title: "agregar opciones",
      type: "boolean",
    }),
    defineField({
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
      hidden: ({ document }) => !document?.shouldAddOptions,
    }),
    defineField({
      name: "excerpt",
      title: "descripción breve",
      type: "text",
    }),
    defineField({
      name: "shouldAddDescription",
      title: "agregar descripción larga",
      type: "boolean",
    }),
    defineField({
      name: "description",
      title: "descripción larga",
      type: "text",
      hidden: ({ document }) => !document?.shouldAddDescription,
    }),
  ],
});
