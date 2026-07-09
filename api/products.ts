// import axios from "axios";
//
// export type ApiProduct = {
//   name: string;
//   code: string;
//   barcode: string;
//   measureUnit: string;
//   weight: number;
// };
//
// const api = axios.create({
//   baseURL: "http://192.168.0.124:8080",
// });
//
// export async function fetchProducts(): Promise<ApiProduct[]> {
//   const response = await api.get("/api/products");
//   return response.data;
// }
export type ApiProduct = {
  name: string;
  code: string;
  barcode: string;
  measureUnit: string;
  weight: number;
  image?: any;
};

export async function fetchProducts(): Promise<ApiProduct[]> {
  return [
    {
      name: "ХЛЕБ ПОСОЛЬСКИЙ ШТ",
      code: "40405",
      barcode: "2140405",
      measureUnit: "шт",
      weight: 0.3,
    },
    {
      name: "ТОРТ МЕДОВО-КАРАМЕЛЬНЫЙ",
      code: "36893",
      barcode: "2236893",
      measureUnit: "кг",
      weight: 1,
    },
    {
      name: "ТОРТ МЕДОВЫЙ",
      code: "00980",
      barcode: "2200980",
      measureUnit: "кг",
      weight: 1,
    },
    {
      name: "ТОРТ МЕДОВЫЙ АРОМАТ",
      code: "66254",
      barcode: "2266254",
      measureUnit: "кг",
      weight: 1,
    },
    {
      name: "КИСЛОТА ЛИМОННАЯ ОК",
      code: "39340",
      barcode: "2284237",
      measureUnit: "кг",
      weight: 0.454,
      image: require("../assets/images/acid.png"),
    },
    {
      name: "СОУС УСТРИЧНЫЙ ОК",
      code: "41140",
      barcode: "2262029",
      measureUnit: "кг",
      weight: 0.454,
      image: require("../assets/images/sauce.png"),
    },
    {
      name: "ОРЕХ МУСКАТНЫЙ ОК",
      code: "40210",
      barcode: "2275637",
      measureUnit: "кг",
      weight: 0.454,
      image: require("../assets/images/nut.png"),
    },
    {
      name: "ТУЧИКЕН КУРИНЫЙ П/Ф ШТ",
      code: "02700",
      barcode: "2101834",
      measureUnit: "шт",
      weight: 0.15,
      image: require("../assets/images/chicken.png"),
    },
    {
      name: "Основы ИИ в примерах на Python",
      code: "18185",
      barcode: "9785977518185",
      measureUnit: "шт",
      weight: 0.5,
      image: require("../assets/images/python.png"),
    },
  ];
}
