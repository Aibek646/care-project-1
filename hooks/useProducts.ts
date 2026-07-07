import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchInterval: 15 * 60 * 1000,
  });
}
