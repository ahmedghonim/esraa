"use client";

import { useToast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { CartContext, TCart } from "../../local-cart";
import { TColor, TProduct, TSize } from "@/types";

const useShowProductActions = () => {
  const { toast } = useToast();

  const [productControler, setProductControler] = useState<{
    qty: number;
    size: TSize | null;
    color: TColor | null;
  }>({ qty: 1, size: null, color: null });

  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some((item: TProduct) => item.id === id);
  };

  const onAddToCart = (product: TProduct) => {
    if (isItemSelected(product.id)) {
      const filteredCart = cart.items.filter(
        (item: TProduct) => item.id !== product.id
      );

      setCart({ ...cart, items: filteredCart });
      toast({
        title: "Removed successfully",
        description: "Product removed successfully",
      });
      return;
    } else {
      setCart({
        ...cart,
        items: [
          ...cart.items,
          {
            ...product,
            qty: productControler.qty,
            selected_size: productControler.size as TSize,
            selected_color: productControler.color as TColor,
          },
        ],
      });
      toast({
        title: "Added successfully",
        description: "Product added successfully",
      });
    }
  };

  /* ------------------------ */
  /*      On Change Item QTY    */
  /* -------------------------- */
  const onChangeQty = (id: number, type: "inc" | "dec") => {
    const getProduct = cart.items.find(
      (product: TProduct) => product.id === id
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

    const updatedItems = cart.items.map((product: TProduct) =>
      product.id === id ? updatedProduct : product
    );

    setCart({ ...cart, items: updatedItems });
  };

  return {
    onAddToCart,
    onChangeQty,
    isItemSelected,
    productControler,
    setProductControler,
  };
};

export { useShowProductActions };
