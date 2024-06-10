"use client";
import React, { useEffect } from "react";
import EmptyCart from "./empty-cart";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";
import { useCartActions } from "./helpers/useCartActions";

type Props = {
  shipping: number;
};

export default function Cart({ shipping }: Props) {
  const { cart, onDeleteItem, onChangeQty, setCart } = useCartActions();

  const isCartHasItems = cart.items.length > 0;
  useEffect(() => {
    setCart({
      ...cart,
      shipping: shipping,
    });
  }, [shipping]);

  return (
    <main className="mb-10">
      {isCartHasItems ? (
        <>
          <CartItems
            cart={cart}
            onChangeQty={onChangeQty}
            onDeleteItem={onDeleteItem}
          />
          <CartTotal cart={cart} />
        </>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
}
