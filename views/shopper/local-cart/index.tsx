"use client";
import React, { createContext, useEffect, useState } from "react";
import { TProduct } from "@/types";

interface Props {
  children: React.ReactNode;
}

export interface TCart {
  items: TProduct[];
  total: number;
  subTotal: number;
}

export const CartContext = createContext(null);

export default function LocalCart({ children }: Props) {
  const [cart, setCart] = useState<TCart>({ items: [], total: 0, subTotal: 0 });

  /* ---------------------------------- */
  /*     Get cart on component mount    */
  /* ---------------------------------- */
  useEffect(() => {
    const localCart = localStorage.getItem("esra_cart_items");

    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  /* ------------------------------- */
  /*     Set cart on every change    */
  /* ------------------------------- */
  useEffect(() => {
    localStorage.setItem("esra_cart_items", JSON.stringify(cart));
  }, [cart]);

  /* ------------------------------- */
  /*     Set cart Total Amounts     */
  /* ------------------------------- */
  useEffect(() => {
    // map on cart items to get the totals
  }, [cart]);

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart } as any}>
        {children}
      </CartContext.Provider>
    </div>
  );
}
