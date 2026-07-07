export type Item = {
  barcode: string;
  plu?: string;
  name: string | null;
  image: any;
  count?: number;
  totalWeight?: number;
  price?: number;
  stock?: number;
  type: "unit" | "weight" | "pieceWeight";
};
