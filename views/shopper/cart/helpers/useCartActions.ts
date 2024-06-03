"use client";
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

    setCart({ ...cart });
  };

  return { onDeleteItem, cart };
};

export { useCartActions };
