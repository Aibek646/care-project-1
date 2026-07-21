export default function parse(data: string) {
  if (data.startsWith("22")) {
    return {
      type: "weight" as const,
      weight: Number(data.slice(7, 12)) / 1000,
    };
  } else if (data.startsWith("21")) {
    return { type: "pieceWeight" as const };
  } else {
    return { type: "unit" as const };
  }
}
