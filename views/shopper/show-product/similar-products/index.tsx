"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export default function SimilarProducts({ data }: { data: Product[] }) {
  const t = useTranslations("common");

  const cart = useContext<TCart | null>(CartContext);

  const { getCartItem, addCartItem } = cart as TCart;

  if (data.length === 0) return null;

  return (
    <section className="mt-[106px] mb-[56px]">
      <EsraSectionTitle title={t("similar_products")} href="/products" />

      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item: any) => (
          <ProductCard
            key={item.id}
            {...item}
            isSelected={getCartItem(item.id)}
            onAddToCart={() =>
              addCartItem(
                item as any,
                1,
                { id: 1, hexcode: "#000", name: "Black" },
                { id: 1, name: "LG" }
              )
            }
          />
        ))}
      </div>
    </section>
  );
}
