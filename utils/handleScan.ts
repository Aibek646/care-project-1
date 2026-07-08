import React from "react";
import { ApiProduct } from "@/api/products";
import { parseBarcode } from "@/utils/barcode";
import { Item } from "@/types/item";

type Params = {
  data: string;
  apiProducts: ApiProduct[] | undefined;
  setItems: (fn: (prev: Item[]) => Item[]) => void;
  setNotFoundBarcode: (barcode: string) => void;
  setScanning: (value: boolean) => void;
  isScanning: React.RefObject<boolean>;
  onAdded: (barcode: string) => void;
};

export function handleScan({
  data,
  apiProducts,
  setItems,
  setNotFoundBarcode,
  setScanning,
  isScanning,
  onAdded,
}: Params) {
  if (isScanning.current) return;
  isScanning.current = true;
  setScanning(false);
  const parsed = parseBarcode(data);
  const prefix = data.slice(0, 7);
  if (parsed.type === "weight") {
    const apiProduct = apiProducts?.find((p) => p.barcode === prefix);
    if (!apiProduct) {
      setNotFoundBarcode(data);
      return;
    }
    setItems((prev) => {
      const existing = prev.findIndex((item) => item.barcode === prefix);
      if (existing !== -1) {
        return prev.map((item, i) =>
          i === existing
            ? { ...item, totalWeight: (item.totalWeight ?? 0) + parsed.weight }
            : item,
        );
      }
      return [
        ...prev,
        {
          barcode: prefix,
          fullBarcode: data,
          name: apiProduct.name,
          image: null,
          totalWeight: parsed.weight,
          type: "weight" as const,
        },
      ];
    });
    onAdded(prefix);
  } else if (parsed.type === "pieceWeight") {
    const apiProduct = apiProducts?.find((p) => p.barcode === prefix);
    if (!apiProduct) {
      setNotFoundBarcode(data);
      return;
    }
    setItems((prev) => {
      const existing = prev.findIndex((item) => item.barcode === prefix);
      if (existing !== -1) {
        return prev.map((item, i) =>
          i === existing ? { ...item, count: (item.count ?? 0) + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          barcode: prefix,
          fullBarcode: data,
          name: apiProduct.name,
          image: null,
          count: 1,
          type: "pieceWeight" as const,
        },
      ];
    });
    onAdded(prefix);
  } else {
    const apiProduct = apiProducts?.find((p) => p.barcode === data);
    if (!apiProduct) {
      setNotFoundBarcode(data);
      return;
    }
    setItems((prev) => {
      const existing = prev.findIndex((item) => item.barcode === data);
      if (existing !== -1) {
        return prev.map((item, i) =>
          i === existing ? { ...item, count: (item.count ?? 0) + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          barcode: data,
          fullBarcode: data,
          name: apiProduct.name,
          image: null,
          count: 1,
          type: "unit" as const,
        },
      ];
    });
    onAdded(data);
  }
}
