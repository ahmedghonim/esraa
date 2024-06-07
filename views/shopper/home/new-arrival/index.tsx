"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { useToast } from "@/components/ui/use-toast";
import { TProduct } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Color, Product, Size } from "@prisma/client";
import React, { useContext } from "react";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function NewArrivals({ data }: Props) {
  const { toast } = useToast();

  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some((item) => item.id === id);
  };

  const onAddToCart = (product: TProduct) => {
    if (isItemSelected(product.id)) {
      const filteredCart = cart.items.filter((item) => item.id !== product.id);

      setCart({ ...cart, items: filteredCart });
      toast({
        title: "Removed successfully",
        description: "Product removed successfully",
      });
      return;
    } else {
      setCart({
        ...cart,
        items: [...cart.items, { ...product, qty: 1, selected_size: "M" }],
      });
      toast({
        title: "Added successfully",
        description: "Product added successfully",
      });
    }
  };
  return (
    <section className="flex flex-col font-bold leading-[150%] md:mt-[45px] mt-7">
      <EsraSectionTitle title="New Arrival" href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item, index) => (
          <ProductCard
            {...item}
            key={item.id}
            isSelected={isItemSelected(item.id)}
            onAddToCart={() => onAddToCart(item as any)}
          />
        ))}
      </div>
    </section>
  );
}
