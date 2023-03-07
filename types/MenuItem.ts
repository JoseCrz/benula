import type { StaticImageData } from "next/image";

export type MenuItem = {
  name: string;
  abstract?: string;
  basePrice: number;
  description?: string;
  pictures?: {
    pictureSrc: StaticImageData;
    pictureAlt: string;
  }[];
  options?: {
    optionPrice: number;
    optionDescription: string;
  }[];
  detailUrl?: string;
};
