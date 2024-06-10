"use client";
import React, { useEffect } from "react";
import EmptyCart from "./empty-cart";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";
import { useCartActions } from "./helpers/useCartActions";

type Props = {
  sapping: number;
};

export default function Cart({ sapping }: Props) {
  const { cart, onDeleteItem, onChangeQty, setCart } = useCartActions();

  const isCartHasItems = cart.items.length > 0;
  useEffect(() => {
    setCart({
      ...cart,
      shipping: sapping,
    });
  }, [sapping]);

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
