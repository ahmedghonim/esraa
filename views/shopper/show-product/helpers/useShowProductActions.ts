"use client";

import { useToast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { CartContext, TCart } from "../../local-cart";
import { TColor, TProduct, TSize } from "@/types";
import { useTranslations } from "next-intl";

const useShowProductActions = () => {
  const { toast } = useToast();

  const t = useTranslations("common");

  const [productControler, setProductControler] = useState<{
    qty: number;
    size: TSize | null;
    color: TColor | null;
  }>({ qty: 1, size: null, color: null });

  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some(
      (item: TProduct) =>
        item.id === id &&
        item.selected_size.id === productControler.size?.id &&
        item.selected_color.id === productControler.color?.id
    );
  };

  const onAddToCart = (product: TProduct) => {
    if (!productControler.size) {
      return toast({
        title: t("select_size"),
        description: t("please_select_size"),
      });
    }

    if (!productControler.color) {
      return toast({
        title: t("select_color"),
        description: t("please_select_color"),
      });
    }

    if (isItemSelected(product.id)) {
      const updatedProducts = cart.items.map((item: TProduct) => {
        if (
          item.id === product.id &&
          item.selected_size.id === productControler.size?.id &&
          item.selected_color.id === productControler.color?.id
        ) {
          return { ...item, qty: (item.qty += 1) };
        }
        return item;
      });

      setCart({ ...cart, items: updatedProducts });

      return;
    } else {
      setCart({
        ...cart,
        items: [
          ...cart.items,
          {
            ...product,
            qty: productControler.qty,
            selected_size: productControler.size as TSize,
            selected_color: productControler.color as TColor,
          },
        ],
      });
    }

    toast({
      title: t("item_added"),
      description: t("item_added_succesfully"),
    });
  };

  return {
    onAddToCart,
    isItemSelected,
    productControler,
    setProductControler,
  };
};

export { useShowProductActions };
