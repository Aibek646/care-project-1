export type PendingScan = {
  barcode: string;
  fullBarcode: string; // полный штрихкод для отображения
  name: string | null;
  image: any;
  type: "unit" | "weight" | "pieceWeight";
  value: number;
};
