"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";

interface IProductImagesProps {
  images: string[];
}

const ProductImages: FC<IProductImagesProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const showLargeImage = (imageIndex: number) => {
    setCurrent(imageIndex);
  };

  return (
    <div className="space-y-4">
      <Image
        src={images![current]}
        alt="hero image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex justify-center">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600 transition-all ease-linear duration-200",
              current === index && "  border-orange-500"
            )}
            onClick={showLargeImage.bind(null, index)}
          >
            <Image src={image} alt={"image"} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
