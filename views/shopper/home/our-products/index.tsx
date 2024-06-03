"use client";
import { ProductCard } from "@/components/ui";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Button } from "@/ui/button";
import React, { useContext } from "react";
import { TProduct } from "@/types";
import EsraSectionTitle from "@/components/ui/section-title";

type Props = {};

export default function OurProducts({}: Props) {
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

  /* ------------------------ */
  /*     See more function    */
  /* ------------------------ */
  const onSeeMore = () => {};

  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title="Our Products" href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {[...Array(8)].map((item, index) => (
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
      <Button
        variant="outline"
        className="mt-8 bg-transparent border-primary-100 border-[2px] text-primary-100"
        onClick={onSeeMore}
      >
        See More
      </Button>
    </section>
  );
}
