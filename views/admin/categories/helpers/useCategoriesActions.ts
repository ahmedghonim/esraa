"use client";
import { TCategory, TProduct } from "@/types";

import { useState } from "react";

const useCategoriesActions = () => {
  const [open, setOpen] = useState(false);

  const [editControler, setEditControler] = useState<TCategory | null>(null);

  /* ------------------------ */
  /*   Get Categories List    */
  /* ------------------------ */

  /* ------------------------ */
  /*  Apply Category Actions  */
  /* ------------------------ */
  const onEditCategory = (category: TCategory) => {
    setEditControler(category);
    setOpen(true);
  };

  const onDeleteCategory = (id: number) => {};

  return {
    open,
    editControler,
    setEditControler,
    setOpen,
    onEditCategory,
    onDeleteCategory,
  };
};

export { useCategoriesActions };
