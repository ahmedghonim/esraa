"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { TColor, TProduct, TSize } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

interface Props {
  children: React.ReactNode;
}

export interface TCart {
  items: TProduct[];
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
  addCartItem: (
    item: TProduct,
    qty: number,
    color: TColor,
    size: TSize
  ) => void;
  removeCartItem: (id: number) => void;
  getCartItem: (id: number, color: TColor, size: TSize) => number;
  clearCart: () => void;
  getTotalItems: () => void;
  getTotalPrice: () => { subTotal: number; total: number };
  setCart: React.Dispatch<React.SetStateAction<TProduct[]>>;
}

export const CartContext = createContext<TCart | null>(null);

export default function LocalCart({ children }: Props) {
  const CART_LOCALE_NAME = "esra_cart_items";

  const { toast } = useToast();

  const t = useTranslations("common");

  const [cart, setCart] = useState<TProduct[]>(() => {
    const storedCart = localStorage.getItem(CART_LOCALE_NAME);

    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [shipping, setShipping] = useState<number>(0);

  const addCartItem = (
    item: TProduct,
    qty: number,
    color: TColor,
    size: TSize
  ) => {
    if (!size) {
      return toast({
        title: t("select_size"),
        description: t("please_select_size"),
      });
    }

    if (!color) {
      return toast({
        title: t("select_color"),
        description: t("please_select_color"),
      });
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (product) =>
          product.id === item.id &&
          product.selected_color?.id === color?.id &&
          product.selected_size?.id === size?.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          selected_color: color,
          selected_size: size,
          qty,
        };

        return updatedCart;
      }
      return [
        ...prevCart,
        { ...item, selected_color: color, selected_size: size, qty },
      ];
    });

    toast({
      title: "Added",
      description: "Product added successfully",
    });
  };

  const removeCartItem = (index: number) => {
    cart.splice(index, 1);

    toast({
      title: "Removed",
      description: "Product removed successfully",
    });
  };

  const getCartItem = (
    itemId: number,
    color: { id: number },
    size: { id: number }
  ) => {
    const existingItemIndex = cart.findIndex(
      (product) =>
        product.id === itemId &&
        product.selected_color?.id === color?.id &&
        product.selected_size?.id === size?.id
    );

    return existingItemIndex;
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
    const subTotal = cart.reduce(
      (total, item) => total + item.qty * item.newPrice || item.price,
      0
    );

    return { subTotal, total: +subTotal + shipping };
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
            shipping,
            setShipping,
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
