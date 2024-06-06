"use client";
import { ProductCard } from "@/components/ui";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Button } from "@/ui/button";
import React, { MouseEvent, useContext } from "react";

import EsraSectionTitle from "@/components/ui/section-title";
import { Color, Product, Size } from "@prisma/client";
import { TProduct } from "@/types";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function OurProducts({ data }: Props) {
  const t = useTranslations("common");

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

  /* ------------------------ */
  /*     See more function    */
  /* ------------------------ */
  const onSeeMore = () => {};

  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title="Our Products" href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item, index) => (
          <ProductCard
            key={index}
            {...item}
            isSelected={isItemSelected(item.id)}
            onAddToCart={() => onAddToCart(item)}
          />
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-8 bg-transparent border-primary-100 border-[2px] text-primary-100"
        onClick={onSeeMore}
      >
        {t("see_more")}
      </Button>
    </section>
  );
}
