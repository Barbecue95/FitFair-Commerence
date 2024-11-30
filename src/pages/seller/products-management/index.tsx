import { SellerSideLayout } from "@/components/SellerSideLayout";
import { config } from "@/config";
import { Search } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Products {
  id: number;
  name: string;
  inStock: boolean;
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<Products[]>([]);
  const router = useRouter();

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
      <h1 className="text-3xl font-medium my-3 pb-3">Products Details List</h1>
      <div className="w-full bg-white flex justify-between p-4 rounded-t-lg max-sm:flex-col gap-2">
        <div className="relative flex items-center border border-[#c2c3c4] max-w-[500px] md:w-[500px] rounded-md h-11">
          <Search
            sx={{
              position: "absolute",
              left: 8,
              color: "#c2c3c4",
            }}
          />
          <InputBase
            placeholder="Search Products..."
            sx={{
              display: "flex",
              flexGrow: 1,
              pl: 6,
              pr: 1,
              py: 1,
              borderRadius: 1,
              width: { xs: "100%", sm: 200 },
              color: "#111",
            }}
          />
        </div>
        <Box>
          <button
            onClick={() => router.push("/seller/products-management/new")}
            className="flex shrink-0 bg-[#586E86] text-white px-3 py-1 rounded-md items-center max-sm:w-full max-sm:justify-center max-sm:mt-3"
          >
            <div className="mr-1 text-2xl">+</div>
            <div className="text-sm">New Product</div>
          </button>
        </Box>
      </div>
    </SellerSideLayout>
  );
}
