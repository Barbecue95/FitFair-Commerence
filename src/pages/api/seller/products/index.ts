import { Products } from "@/pages/seller/products-management";
import type { NextApiRequest, NextApiResponse } from "next";

export const products: Products[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    res.status(200).json(products);
  } else if (method === "POST") {
    const product = req.body;
    const isValid = product.name;
    if (!isValid) return res.status(400).send("Bad Request");
    products.push(product);
    res.end();
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  res.end();
}
