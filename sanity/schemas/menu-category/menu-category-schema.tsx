import { defineField, defineType } from "sanity";
import { BiFoodMenu } from "react-icons/bi";

import { menuItemType, type MenuItem } from "../menu-item";
import { dessertType, type Dessert } from "../dessert";

type CategoryItem = MenuItem | Dessert;

export type MenuCategory = {
  _id: string;
  _type: "menuCategory";
  name: string;
  placement: number;
  categoryItems?: CategoryItem[];
  hasLimitedAvailability: boolean;
  availability?: {
    startTime: number;
    endTime: number;
  };
};

export const menuCategoryType = defineType({
  type: "document",
  name: "menuCategory",
  title: "Categoria de Menú",
  icon: BiFoodMenu,
  fields: [
    defineField({
      name: "name",
      title: "nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placement",
      title: "orden en el menú",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoryItems",
      title: "items de la categoria",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: menuItemType.name,
            },
            {
              type: dessertType.name,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "hasLimitedAvailability",
      title: "servicio limitado",
      type: "boolean",
      initialValue: false,
      description:
        "Al indicar servicio limitado es importante que todos los campos de abajo queden llenados, de lo contrario no se podrá actualizar la página.",
    }),
    defineField({
      name: "availability",
      title: "horario de servicio",
      type: "object",
      fields: [
        {
          name: "startTime",
          title: "hora de inicio",
          type: "number",
          options: {
            list: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23,
            ],
          },
        },
        defineField({
          name: "endTime",
          title: "hora de termino",
          type: "number",
          options: {
            list: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23,
            ],
          },
        }),
      ],
      hidden: ({ document }) => !document?.hasLimitedAvailability,
    }),
  ],
});
