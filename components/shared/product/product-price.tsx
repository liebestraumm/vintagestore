//This is used for dynamic classes, so you can pass a Tailwind class as a prop
import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProductPriceProps {
  value: number;
  className?: string;
}

const ProductPrice: FC<IProductPriceProps> = ({ value, className }) => {
  // Ensures two decimal places
  const stringValue = value.toFixed(2);
  // Split into integer and decimal parts
  const [intValue, floatValue] = stringValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
