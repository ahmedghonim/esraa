"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { TProduct } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Color, Product, Size } from "@prisma/client";
import React, { useContext } from "react";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function NewArrivals({ data }: Props) {
  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items?.some((item) => item.id === id);
  };

  const onAddToCart = (product: TProduct, isSelected: boolean) => {
    if (isSelected) {
      // toast info message that the product is selected
      return;
    }

    setCart({ ...cart, items: [...cart.items, product] });
  };

  return (
    <section className="flex flex-col font-bold leading-[150%] md:mt-[45px] mt-7">
      <EsraSectionTitle title="New Arrival" href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item, index) => (
          <ProductCard
            {...item}
            key={item.id}
            isSelected={isItemSelected(0)}
            onAddToCart={() => onAddToCart(item, isItemSelected(0))}
          />
        ))}
      </div>
    </section>
  );
}
