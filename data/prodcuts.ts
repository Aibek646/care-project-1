export const products = [
  {
    id: 1,
    barcode: "9785977518185",
    name: "Python на практике",
    image: require("../assets/images/nut.png"),
    price: 2500,
    stock: 47,
  },
  {
    id: 2,
    barcode: "9785943872716",
    name: "JavaScript для FrontEnd-разработчиков",
    image: require("../assets/images/acid.png"),
    price: 1800,
    stock: 32,
  },
];

export type Product = (typeof products)[0];
