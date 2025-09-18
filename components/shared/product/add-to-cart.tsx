"use client";

import { CartItem } from "@/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface IAddToCartProps {
  item: CartItem;
}

const AddToCart: FC<IAddToCartProps> = ({ item }) => {
  const router = useRouter();
  // const { customToast } = useToast();

  const handleAddToCart = async () => {
    // Execute the addItemToCart action
    const res = await addItemToCart(item);

    // Display appropriate toast message based on the result
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name} added to the cart`, {
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
