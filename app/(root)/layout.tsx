import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { IChildrenNode } from "@/interfaces/ParamsInterfaces";
import { FC } from "react";

const RootLayout: FC<IChildrenNode> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
