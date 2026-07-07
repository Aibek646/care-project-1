export type ApiProduct = {
  name: string;
  code: string;
  barcode: string;
  measureUnit: string;
  weight: number;
};

export async function fetchProducts():Promise<ApiProduct[]> {
  const response = await
}
