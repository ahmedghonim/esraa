"use client";
import { TColor, TSize } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { useContext } from "react";

const useCartActions = () => {
  const cart = useContext<TCart | null>(CartContext);

  const {
    clearCart,
    setCart,
    getCartItem,
    removeCartItem,
    setShipping,
    shipping,
    items,
    getTotalPrice,
  } = cart as TCart;

  const onChangeQty = (
    id: number,
    selected_size: TSize,
    selected_color: TColor,
    type: "inc" | "dec"
  ) => {
    const productIndex = getCartItem(id, selected_color, selected_size);

    if (productIndex === -1) return;

    const product = { ...items[productIndex] };

    const isProductHasStock = product.ProductVariant?.find(
      (item) =>
        item.colorId === selected_color.id && item.sizeId === selected_size.id
    );

    if (type === "dec") {
      if (product.qty > 1) {
        product.qty -= 1;
      }
    }

    if (type === "inc") {
      if (Number(isProductHasStock?.stock) > product.qty) {
        product.qty += 1;
      }
    }

    const updatedCart = [...items];

    updatedCart[productIndex] = product;

    setCart(updatedCart);
  };

  return {
    clearCart,
    onChangeQty,
    removeCartItem,
    getTotalPrice,
    setShippingFee: setShipping,
    setCart,
    shippingFee: shipping,
    items,
  };
};

export { useCartActions };
