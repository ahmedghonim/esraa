"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { useToast } from "@/components/ui/use-toast";
import { TProduct } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export default function SimilarProducts({ data }: { data: Product[] }) {
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
        items: [
          ...(cart.items as any),
          { ...product, qty: 1, selected_size: "M" },
        ],
      });
      toast({
        title: "Added successfully",
        description: "Product added successfully",
      });
    }
  };

  if (data.length === 0) return null;

  return (
    <section className="mt-[106px] mb-[56px]">
      <EsraSectionTitle title={t("similar_products")} href="/products" />

      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item: any) => (
          <ProductCard
            key={item.id}
            {...item}
            isSelected={isItemSelected(item.id)}
            onAddToCart={() => onAddToCart(item as any)}
          />
        ))}
      </div>
    </section>
  );
}
