export function parseBarcode(barcode: string) {
  if (barcode.startsWith("22")) {
    const weight = parseInt(barcode.slice(7, 12), 10) / 1000;
    return { type: "weight" as const, weight };
  }
  if (barcode.startsWith("21")) {
    return { type: "pieceWeight" as const };
  }
  return { type: "unit" as const };
}
