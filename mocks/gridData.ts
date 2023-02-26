import type { ImageProps } from "next/image";

import frutosImage from "@/public/images/mocks/frutos.jpeg";
import heladoImage from "@/public/images/mocks/helado.jpeg";
import paletasImage from "@/public/images/mocks/paletas.jpeg";

type GridItem = {
  id: number;
  imageSrc: ImageProps["src"];
  altText: ImageProps["alt"];
  date: string;
  title: string;
  text: string;
  seeMoreUrl: string;
};

export const gridData: GridItem[] = [
  {
    id: 1,
    imageSrc: frutosImage,
    altText: "frutos otoñales",
    date: "Octubre 2022",
    title: "frutos otoñales",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
    seeMoreUrl: "/",
  },
  {
    id: 2,
    imageSrc: heladoImage,
    altText: "helado fresco",
    date: "Junio 2022",
    title: "helado fresco",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
    seeMoreUrl: "/",
  },
  {
    id: 3,
    imageSrc: paletasImage,
    altText: "paletas veraniegas",
    date: "Julio 2022",
    title: "paletas veraniegas",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
    seeMoreUrl: "/",
  },
];
