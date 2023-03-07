import type { ImageProps } from "next/image";

import nubeImage from "@/public/images/mocks/nube.jpeg";
import avellanaImage from "@/public/images/mocks/avellana.jpeg";
import azaharImage from "@/public/images/mocks/azahar.jpeg";
import pistacheImage from "@/public/images/mocks/pistache-1.jpeg";
import vainillaImage from "@/public/images/mocks/vainilla.jpeg";

type MockCarouselItem = {
  id: number;
  name: string;
  author: string;
  month: string;
  seeMoreUrl: string;
  seeAllUrl: string;
  image: ImageProps["src"];
  altText: string;
};

export const carouselData: MockCarouselItem[] = [
  {
    id: 1,
    name: "nube de guayaba",
    author: "chef victor mendonza",
    month: "noviembre",
    seeMoreUrl: "/",
    seeAllUrl: "/",
    image: nubeImage,
    altText: "",
  },
  {
    id: 2,
    name: "tarta de avellana",
    author: "chef benjamin mendez",
    month: "diciembre",
    seeMoreUrl: "/",
    seeAllUrl: "/",
    image: avellanaImage,
    altText: "",
  },
  {
    id: 3,
    name: "azahar y citricos",
    author: "chef vanessa caballero",
    month: "enero",
    seeMoreUrl: "/",
    seeAllUrl: "/",
    image: azaharImage,
    altText: "",
  },
  {
    id: 4,
    name: "espiral de pistache",
    author: "chef osmar arcos",
    month: "febrero",
    seeMoreUrl: "/",
    seeAllUrl: "/",
    image: pistacheImage,
    altText: "",
  },
  {
    id: 5,
    name: "tarta de vainilla",
    author: "chef paula llamas",
    month: "marzo",
    seeMoreUrl: "/",
    seeAllUrl: "/",
    image: vainillaImage,
    altText: "",
  },
];
