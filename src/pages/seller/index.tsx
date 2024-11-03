import { SellerSideLayout } from "@/components/SellerSideLayout";
import { Montserrat, Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "100" });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function SellerPage() {
  return (
    <SellerSideLayout>
      <h1 className={`${montserrat.className} p-5`}>Seller Side</h1>
    </SellerSideLayout>
  );
}
