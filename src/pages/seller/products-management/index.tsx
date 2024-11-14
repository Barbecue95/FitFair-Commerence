import { SellerSideLayout } from "@/components/SellerSideLayout";
import { config } from "@/config";
import { useEffect, useState } from "react";

export interface Products {
  id: number;
  name: string;
  inStock: boolean;
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch(`${config.sellerApiUrl}/products`);
    const products = await response.json();
    setProducts(products);
  };

  return (
    <SellerSideLayout>
      <h1>Products Management Page</h1>
    </SellerSideLayout>
  );
}
