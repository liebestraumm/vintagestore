import Image from "next/image";
import loader from "@/assets/loader.gif";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Image src={loader} width={150} height={150} alt="Loading..." />
    </div>
  );
};

export default Loading;
