const BASE_URL = "http://192.168.0.124:8080";

export const fetchBrands = async () => {
  const response = await fetch(`${BASE_URL}/brands`);
  if (!response.ok) throw new Error("Failed to fetch brands.");
  return response.json();
};
