import { ReactNode } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

interface Props {
  children: ReactNode;
}

export function SellerSideLayout({ children }: Props) {
  return (
    <div className="flex h-[100vh]">
      <div className="max-sm:hidden h-[100vh]">
        <SideBar />
      </div>
      <div className="w-full h-[100vh] flex flex-col">
        <TopBar />
        <div className="px-5 bg-[#f1f1f1] flex-grow h-[100vh]">{children}</div>
      </div>
    </div>
  );
}
