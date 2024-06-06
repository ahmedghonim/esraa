"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { TProduct } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export default function SimilarProducts({ data }: { data: Product[] }) {
  const t = useTranslations("common");
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
      <EsraSectionTitle title={t("similar_products")} href="" />

      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item: any) => (
          <ProductCard
            key={item.id}
            {...item}
            isSelected={isItemSelected(0)}
            onAddToCart={() => onAddToCart(item, isItemSelected(0))}
          />
        ))}
      </div>
    </section>
  );
}
