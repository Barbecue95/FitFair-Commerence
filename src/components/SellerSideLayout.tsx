import { ReactNode } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

interface Props {
  children: ReactNode;
}

export function SellerSideLayout({ children }: Props) {
  return (
    <div className="flex h-full">
      <div className="max-sm:hidden h-full">
        <SideBar />
      </div>
      <div className="w-full h-[100vh] flex flex-col">
        <div className="sticky">
          <TopBar />
        </div>
        <div className="p-5 bg-[#f1f1f1] h-[100%] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
