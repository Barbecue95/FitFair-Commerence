import { ReactNode } from "react";
import { SideBar } from "./SideBar";

interface Props {
  children: ReactNode;
}

export function SellerSideLayout({ children }: Props) {
  return (
    <div className="flex">
      <SideBar />
      <div className="p-5">{children}</div>
    </div>
  );
}
