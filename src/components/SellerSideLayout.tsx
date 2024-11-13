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
      <div className="w-full h-[100vh] flex flex-col">
        <TopBar />
        <div className="p-5 bg-[#f1f1f1] flex-grow h-full">{children}</div>
      </div>
    </div>
  );
}
