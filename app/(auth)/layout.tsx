import { IChildrenNode } from "@/interfaces/ParamsInterfaces";
import { FC } from "react";

const Layout: FC<IChildrenNode> = ({ children }) => {
  return <div className="flex-center min-h-screen w-full ">{children}</div>;
};
export default Layout;
