"use client";
import React, { createContext, useEffect, useState } from "react";
import { TProduct } from "@/types";

interface Props {
  children: React.ReactNode;
}

export interface TCart {
  items: TProduct[];
  total: number;
  shipping: number;
  subTotal: number;
}

export const CartContext = createContext(null);

export default function LocalCart({ children }: Props) {
  const [cart, setCart] = useState<TCart>({
    items: [],
    total: 0,
    subTotal: 0,
    shipping: 0,
  });

  const [isCartSynced, setIsCartSynced] = useState<boolean>(false);

  /* ---------------------------------- */
  /*     Get cart on component mount    */
  /* ---------------------------------- */
  useEffect(() => {
    const localCart = localStorage.getItem("esra_cart_items");

    if (localCart) {
      setCart(JSON.parse(localCart));
    }
    setIsCartSynced(true);
  }, []);

  /* ------------------------------- */
  /*     Set cart on every change    */
  /* ------------------------------- */
  useEffect(() => {
    if (isCartSynced) {
      localStorage.setItem("esra_cart_items", JSON.stringify(cart));
    }
  }, [cart]);

  /* ------------------------------- */
  /*     Set cart Total Amounts     */
  /* ------------------------------- */
  useEffect(() => {
    if (isCartSynced) {
      const subTotal = cart.items.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
    }
  }, [cart]);

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart } as any}>
        {children}
      </CartContext.Provider>
    </div>
  );
}
