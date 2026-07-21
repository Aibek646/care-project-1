import parse from "@/utils/practice/parse";

type scanProps = {
  barcode: string;
  catalog:
    | {
        name: string;
        barcode: string;
      }[]
    | undefined;
  isScanning: {
    current: boolean;
  };
  onFound: (value: {
    barcode: string;
    name: string;
    fullBarcode: string;
    type: string;
    value: number;
  }) => void;
  onNotFound: (barcode: string) => void;
};

export default function handleScan(data: scanProps) {
  if (data.isScanning.current) return;
  const parsed = parse(data.barcode);
  const searchKey =
    parsed.type === "unit" ? data.barcode : data.barcode.slice(0, 7);
  data.isScanning.current = true;
  const foundItem = data.catalog?.find((item) => {
    return searchKey === item.barcode;
  });
  if (foundItem) {
    data.onFound({
      barcode: foundItem.barcode,
      name: foundItem.name,
      type: parsed.type,
      fullBarcode: data.barcode,
      value: parsed.type === "weight" ? parsed.weight : 1,
    });
  } else {
    data.onNotFound(data.barcode);
  }
}
