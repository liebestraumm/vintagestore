import Image from "next/image";
import loader from "@/assets/loader.gif";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Image src={loader} width={150} height={150} alt="Loading..." unoptimized/>
    </div>
  );
};

export default Loading;
