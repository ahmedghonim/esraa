"use client";
import { TColor, TSize } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { useContext } from "react";

const useCartActions = () => {
  const cart = useContext<TCart | null>(CartContext);

  const { clearCart, setCart, getCartItem } = cart as TCart;

  const onChangeQty = (
    id: number,
    selected_size: TSize,
    selected_color: TColor,
    type: "inc" | "dec"
  ) => {
    const product = getCartItem(id);

    if (!product) return;

    const updatedProduct = { ...product };

    if (type === "dec") {
      if (updatedProduct.qty > 1) {
        updatedProduct.qty -= 1;
      }
    }

    if (type === "inc") {
      updatedProduct.qty += 1;
    }

    const updatedItems = cart?.items.map((product) =>
      product.id === id &&
      product.ProductVariant.find(
        (variant) =>
          variant.sizeId === selected_size.id &&
          variant.colorId === selected_color.id
      )
        ? updatedProduct
        : product
    );

    setCart([...(cart?.items as any), updatedItems]);
  };

  return { clearCart, onChangeQty, cart };
};

export { useCartActions };
