import { ReactNode } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

interface Props {
  children: ReactNode;
}

export function SellerSideLayout({ children }: Props) {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
