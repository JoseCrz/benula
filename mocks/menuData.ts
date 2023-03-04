import type { MenuItem } from "@/types";

export const mocktailsData: MenuItem[] = [
  {
    name: "lavanda tonic",
    abstract:
      "extracto de lavanda, jarabe de miel y carambolo, agua tónica, limón y aceite verde de lavanda acompañado de mini tarta de chocolate, gel de frutos rojos, vainilla y geleé de cítricos",
    basePrice: 60,
  },
  {
    name: "piña, coco y canela",
    abstract:
      "tepache clarificado, mineral, espuma de coco y coco tostado, gomitas de fruta ácida y azúcar de canela.",
    basePrice: 60,
  },
  {
    name: "cítrico y herbal",
    abstract:
      "pulpa de maracuyá, limón, jarabe de menta y albahaca, agua mineral y soda casera.",
    basePrice: 60,
  },
  {
    name: "ginger beer",
    abstract: "bebida carbonatada de jengibre casera.",
    basePrice: 60,
  },
  {
    name: "carajillo 43*",
    abstract: "espresso doble, licor 43, cacao y naranja.",
    basePrice: 85,
  },
];

export const brunchData: MenuItem[] = [
  {
    name: "fruta",
    abstract:
      "manzana, guayaba, melón y mix de frutas de temporada, miel, cacao nibs, pistache.",
    basePrice: 55,
  },
  {
    name: "omelette",
    abstract:
      "tres huevos, puré de frijoles criollos, ensalada fresca y dos rebanadas de pan",
    basePrice: 55,
    options: [
      {
        optionDescription: "relleno de espinacas y aguacate o quesos",
        optionPrice: 65,
      },
      {
        optionDescription: "relleno de pollo o jamón serrano o setas",
        optionPrice: 70,
      },
    ],
  },
  {
    name: "papas preparadas estilo tierra blanca",
    abstract:
      "papas salteadas glaseadas con frijoles, crema, queso, carne de res deshebrada, ensalada y salsa de chile seco",
    basePrice: 95,
  },
  {
    name: "huevos en cazuela",
    abstract:
      "salsa de tomate, queso provoleta, dos huevos tiernos, cilantro y pan de masa madre ",
    basePrice: 9999,
    options: [
      {
        optionDescription: "con espinacas o setas",
        optionPrice: 75,
      },
      {
        optionDescription: "con pollo o jamón serrano",
        optionPrice: 80,
      },
    ],
  },
  {
    name: "huevos rotos",
    abstract:
      "papa machacada, queso mozzarella, provolone, huevos estrellados, jamón serrano y ensalada fresca.",
    basePrice: 95,
  },
  {
    name: "chilaquiles",
    abstract:
      "totopos bañados en salsa verde o roja, queso, crema, aguacate, cebollita cambray, rábano y cilantro criollo",
    basePrice: 75,
    options: [
      {
        optionDescription: "con pollo",
        optionPrice: 95,
      },
      {
        optionDescription: "con dos huevos estrellados o setas",
        optionPrice: 85,
      },
    ],
  },
  {
    name: "pan francés",
    abstract:
      "pan brioche caramelizado, helado, moras, pistache, cacao nibs y miel.",
    basePrice: 90,
  },
];

export const sandwichData: MenuItem[] = [
  {
    name: "tosta de aguacate",
    abstract: "pan a elegir, aguacate, cebollita cambray y cilantro criollo",
    basePrice: 60,
  },
  {
    name: "tosta de melón con jamón",
    abstract:
      "pan a elegir, queso de cabra, esferas de melón, jamón serrano, vinagreta de bálsamico, almendra y mix de hojas",
    basePrice: 90,
  },
  {
    name: "tosta de setas",
    abstract:
      "pan a elegir, estofado de jitomate, setas asadas y ensalada fresca.",
    basePrice: 70,
  },
  {
    name: "emparedado de pollo picante",
    abstract:
      "pan a elegir, muslo de pollo crujiente estilo nashville y ensalada de col acompañado de papas fritas con hojuelas de chile y queso provolone.",
    basePrice: 105,
  },
  {
    name: "emparedado de quesos",
    abstract:
      "pan brioche, tres quesos, mayonesa de mostaza, ensalada, papas fritas con hojuelas de chile",
    basePrice: 115,
  },
];

export const dessertsData: MenuItem[] = [
  {
    name: "espiral de pistache y fresa 2.0",
    abstract:
      "frangipane de pistache y almendra, compota de fresas, ganache de pistache y chocolate blanco.",
    basePrice: 75,
  },
  {
    name: "tarta avellana y chocolate amargo",
    abstract:
      "tarta de masa sablé de cacao, frangipane de avellana, mousse de chocolate relleno  de praline de avellanas, esponjas y nibs. ",
    basePrice: 75,
  },
  {
    name: "tarta de vainilla",
    abstract:
      "masa sableé de nuez moscada, pain de gênes de cacahuate, diplomatica de cardamomo, manzana fresca, mousse de vainilla natural y helado de vainilla. ",
    basePrice: 75,
  },
  {
    name: "mil hojas de temporada",
    abstract:
      "tejas de hojaldre, mousselina de coco, dulce de leche, batida de macadamia, gel y sorbete de guanábana.",
    basePrice: 75,
  },
  {
    name: "hojas y flores",
    abstract:
      "helado de crema, mousse de flor azahar, cerezas, durazno pacificado, panque de mantequilla, toronjil, lavanda, mix de hojas y flores",
    basePrice: 75,
  },
  {
    name: "”el amor” ",
    abstract:
      "base de bizcocho red velvet, merengue de limón, chessecake de zapote negro y mandarina relleno de crema de vino blanco y reducción de vino tinto.",
    basePrice: 80,
  },
];
