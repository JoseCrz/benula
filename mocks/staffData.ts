import type { ImageProps } from "next/image";

import benjaminImage from "@/public/images/mocks/benjamin.jpeg";
import paulaImage from "@/public/images/mocks/paula.jpeg";

type StaffItem = {
  id: number;
  imageSrc: ImageProps["src"];
  altText: ImageProps["alt"];
  name: string;
  role: string;
};

export const staffData: StaffItem[] = [
  {
    id: 2,
    name: "benjamín",
    imageSrc: benjaminImage,
    altText: "una foto de benjamín",
    role: "postres y alimentos",
  },
  {
    id: 1,
    name: "ana paula",
    imageSrc: paulaImage,
    altText: "una foto de paula",
    role: "barra de bebidas",
  },
  {
    id: 4,
    name: "benjamín",
    imageSrc: benjaminImage,
    altText: "una foto de benjamín",
    role: "postres y alimentos",
  },
  {
    id: 3,
    name: "ana paula",
    imageSrc: paulaImage,
    altText: "una foto de paula",
    role: "barra de bebidas",
  },
];
