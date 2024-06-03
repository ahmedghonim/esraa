"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";

import { TProduct } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import React, { useContext } from "react";

type Props = {};

export default function SimilarProducts({}: Props) {
  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some((item) => item.id === id);
  };

  const onAddToCart = (product: TProduct, isSelected: boolean) => {
    if (isSelected) {
      // toast info message that the product is selected
      return;
    }

    setCart({ ...cart, items: [...cart.items, product] });
  };

  return (
    <section className="mt-[106px] mb-[56px]">
      <EsraSectionTitle title="Similar Products" href="" />

      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {[...Array(4)].map((item, index) => (
          <ProductCard
            key={index}
            id={0}
            name={"tailored stretch"}
            price={3000}
            colors={["#9747FF", "#988B1D", "#292929"]}
            isSelected={isItemSelected(0)}
            onAddToCart={() => onAddToCart(item, isItemSelected(0))}
          />
        ))}
      </div>
    </section>
  );
}
