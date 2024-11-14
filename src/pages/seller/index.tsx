import { SellerSideLayout } from "@/components/SellerSideLayout";
import { Montserrat, Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function SellerPage() {
  return (
    <SellerSideLayout>
      <h1 className={`${roboto.className} p-3 font-medium text-3xl`}>
        Seller Side
      </h1>
    </SellerSideLayout>
  );
}
