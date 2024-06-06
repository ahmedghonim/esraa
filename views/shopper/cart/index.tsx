"use client";
import React from "react";
import EmptyCart from "./empty-cart";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";
import { useCartActions } from "./helpers/useCartActions";

type Props = {};

export default function Cart({}: Props) {
  const { cart, onDeleteItem, onChangeQty } = useCartActions();

  const isCartHasItems = cart.items.length > 0;

  return (
    <main className="mb-10">
      {isCartHasItems ? (
        <>
          <CartItems
            cart={cart}
            onChangeQty={onChangeQty}
            onDeleteItem={onDeleteItem}
          />
          <CartTotal
            subTotal={cart.subTotal}
            shipping={cart.shipping}
            grandTotal={cart.total}
          />
        </>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
}
