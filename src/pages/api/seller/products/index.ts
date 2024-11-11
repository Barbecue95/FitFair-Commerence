import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    products: [{ id: 1, name: "T-Shirt", instock: true, quantity: 20 }],
  });
}