import axios from "axios";

export type ApiProduct = {
  name: string;
  code: string;
  barcode: string;
  measureUnit: string;
  weight: number;
};

const api = axios.create({
  baseURL: "http://192.168.0.124:8080",
});

export async function fetchProducts(): Promise<ApiProduct[]> {
  const response = await api.get("/api/products");
  return response.data;
}
