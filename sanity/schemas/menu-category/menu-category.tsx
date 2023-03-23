import { defineField, defineType } from "sanity";
import { BiFoodMenu } from "react-icons/bi";

import { MENU_ITEM_NAME, MenuItem } from "../menu-item";

export const MENU_CATEGORY_NAME = "menuCategory";

export type MenuCategory = {
  _id: string;
  name: string;
  placement: number;
  menuItems: Pick<
    MenuItem,
    "_id" | "name" | "price" | "excerpt" | "slug" | "options"
  >[];
  availability?: {
    startTime: number;
    endTime: number;
  };
};

export const menuCategoryType = defineType({
  type: "document",
  name: MENU_CATEGORY_NAME,
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
      name: "menuItems",
      title: "menu items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: MENU_ITEM_NAME,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "shouldAddLimitedService",
      title: "servicio limitado",
      type: "boolean",
      initialValue: false,
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
      hidden: ({ document }) => !document?.shouldAddLimitedService,
    }),
  ],
});
