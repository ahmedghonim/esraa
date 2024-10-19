"use client";
import React, { createContext, useEffect, useState } from "react";
import { TColor, TProduct, TSize } from "@/types";

interface Props {
  children: React.ReactNode;
}

export interface TCart {
  items: TProduct[];
  addCartItem: (
    item: TProduct,
    qty: number,
    color: TColor,
    size: TSize
  ) => void;
  removeCartItem: (id: number) => void;
  getCartItem: (id: number) => TProduct | undefined;
  clearCart: () => void;
  getTotalItems: () => void;
  getTotalPrice: () => { subTotal: number; total: number };
  setCart: React.Dispatch<React.SetStateAction<TProduct[]>>;
}

export const CartContext = createContext<TCart | null>(null);

export default function LocalCart({ children }: Props) {
  const CART_LOCALE_NAME = "esra_cart_items";

  const [cart, setCart] = useState<TProduct[]>(() => {
    const storedCart = localStorage.getItem(CART_LOCALE_NAME);

    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addCartItem = (
    item: TProduct,
    qty: number,
    color: TColor,
    size: TSize
  ) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        // Item already in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          qty: qty,
          selected_color: color,
        };

        return updatedCart;
      }
      // Item not in cart, add it
      return [
        ...prevCart,
        { ...item, selected_color: color, selected_size: size, qty },
      ];
    });
  };

  const removeCartItem = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const getCartItem = (
    itemId: number,
    color: { id: number },
    size: { id: number }
  ) => {
    return cart.find(
      (item) =>
        item.id === itemId &&
        item.selected_size.id === size?.id &&
        item.selected_color.id === color?.id
    );
  };

  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    const total = cart
      .reduce(
        (total, item) => total + item.newPrice || item.price * item.qty,
        0
      )
      .toFixed(2);

    return { subTotal: total, total };
  };

  useEffect(() => {
    localStorage.setItem(CART_LOCALE_NAME, JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <CartContext.Provider
        value={
          {
            items: cart,
            addCartItem,
            removeCartItem,
            getCartItem,
            clearCart,
            getTotalItems,
            getTotalPrice,
            setCart,
          } as any
        }
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}
