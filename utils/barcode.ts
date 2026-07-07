export function parseBarcode(barcode: string) {
  if (barcode.startsWith("21") || barcode.startsWith("22")) {
    const plu = barcode.slice(2, 7);
    const weight = parseInt(barcode.slice(7, 12), 10) / 1000;
    return { type: "weight" as const, plu, weight };
  }
  if (barcode.startsWith("21")) {
    const plu = barcode.slice(2, 7);
    return { type: "pieceWeight" as const, plu };
  }
  return { type: "unit" as const };
}
