import React from "react";
import { ApiProduct } from "@/api/products";
import { parseBarcode } from "@/utils/barcode";
import { PendingScan } from "@/types/pendingScan";

type Params = {
  data: string;
  apiProducts: ApiProduct[] | undefined;
  setNotFoundBarcode: (barcode: string) => void;
  setScanning: (value: boolean) => void;
  isScanning: React.RefObject<boolean>;
  onFound: (pending: PendingScan) => void;
};

export function handleScan({
  data,
  apiProducts,
  setNotFoundBarcode,
  setScanning,
  isScanning,
  onFound,
}: Params) {
  if (isScanning.current) return;
  isScanning.current = true;
  setScanning(false);

  const parsed = parseBarcode(data);
  const prefix = data.slice(0, 7);
  const searchKey = parsed.type === "unit" ? data : prefix;

  const apiProduct = apiProducts?.find((p) => p.barcode === searchKey);
  if (!apiProduct) {
    setNotFoundBarcode(data);
    return;
  }

  onFound({
    barcode: searchKey,
    fullBarcode: data,
    name: apiProduct.name,
    image: apiProduct.image ?? null,
    type: parsed.type,
    value: parsed.type === "weight" ? parsed.weight : 1,
  });
}
