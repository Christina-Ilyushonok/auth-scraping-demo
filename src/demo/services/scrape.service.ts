import axios from "axios";
import { CONFIG } from "../config";

export async function scrapeProducts(token: string) {
  const res = await axios.get(`${CONFIG.API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}