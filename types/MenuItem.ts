export type MenuItem = {
  name: string;
  abstract?: string;
  basePrice: number;
  description?: string;
  pictures?: string[];
  options?: {
    optionPrice: number;
    optionDescription: string;
  }[];
};
