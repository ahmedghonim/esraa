"use client";
import { TColor, TSize } from "@/types";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { useContext } from "react";

const useCartActions = () => {
  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);
  /* ------------------------ */
  /*      On Delete Item     */
  /* ------------------------ */
  const onDeleteItem = (index: number) => {
    cart.items.splice(index, 1);
  };

  /* ------------------------ */
  /*      On Change Item QTY    */
  /* -------------------------- */
  const onChangeQty = (
    id: number,
    selected_size: TSize,
    selected_color: TColor,
    type: "inc" | "dec"
  ) => {
    const getProduct = cart.items.find(
      (product) =>
        product.id === id &&
        product.ProductVariant.find(
          (variant) =>
            variant.sizeId === selected_size.id &&
            variant.colorId === selected_color.id
        )
    );

    if (!getProduct) {
      return;
    }

    const updatedProduct = { ...getProduct };

    if (type === "dec") {
      if (updatedProduct.qty > 1) {
        updatedProduct.qty -= 1;
      }
    }

    if (type === "inc") {
      updatedProduct.qty += 1;
    }

    const updatedItems = cart.items.map((product) =>
      product.id === id &&
      product.ProductVariant.find(
        (variant) =>
          variant.sizeId === selected_size.id &&
          variant.colorId === selected_color.id
      )
        ? updatedProduct
        : product
    );

    setCart({ ...cart, items: updatedItems });
  };

  return { onDeleteItem, onChangeQty, cart, setCart };
};

export { useCartActions };
