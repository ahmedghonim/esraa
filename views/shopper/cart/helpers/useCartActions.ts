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
    const product = getCartItem(id, selected_color, selected_size);

    // if (!product) return;

    // const updatedProduct = { ...product };

    // if (type === "dec") {
    //   if (updatedProduct.qty > 1) {
    //     updatedProduct.qty -= 1;
    //   }
    // }

    // if (type === "inc") {
    //   if (product.stock > product.qty) {
    //     updatedProduct.qty += 1;
    //   }
    // }

    // const updatedItems = items.map((product) =>
    //   product.id === id &&
    //   product.ProductVariant.find(
    //     (variant) =>
    //       variant.sizeId === selected_size.id &&
    //       variant.colorId === selected_color.id
    //   )
    //     ? updatedProduct
    //     : product
    // );

    // setCart([...(cart?.items as any), updatedItems]);
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
