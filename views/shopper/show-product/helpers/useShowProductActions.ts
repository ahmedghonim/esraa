"use client";

import { useState } from "react";
import { TColor, TSize } from "@/types";

const useShowProductActions = () => {
  const [productControler, setProductControler] = useState<{
    qty: number;
    size: TSize | null;
    color: TColor | null;
  }>({ qty: 1, size: null, color: null });

  return {
    productControler,
    setProductControler,
  };
};

export { useShowProductActions };
