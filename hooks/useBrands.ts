import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/brands";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    refetchInterval: 15 * 60 * 1000,
  });
};
