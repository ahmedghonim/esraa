"use client";
import { TCategory, TProduct } from "@/types";
import { useState } from "react";

const useProductsActions = () => {
  const [open, setOpen] = useState(false);

  const [editControler, setEditControler] = useState<TProduct | null>(null);

  /* ------------------------ */
  /*   Get Products List    */
  /* ------------------------ */

  /* ------------------------ */
  /*  Apply Product Actions  */
  /* ------------------------ */
  const onEditProduct = (product: TCategory) => {
    setEditControler(product);
    setOpen(true);
  };

  const onDeleteProduct = (id: number) => {};

  return {
    open,
    editControler,
    setEditControler,
    setOpen,
    onEditProduct,
    onDeleteProduct,
  };
};

export { useProductsActions };
