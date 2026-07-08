export type Item = {
  barcode: string;
  fullBarcode: string;
  name: string | null;
  image: any;
  count?: number;
  totalWeight?: number;
  price?: number;
  stock?: number;
  type: "unit" | "weight" | "pieceWeight";
};
