import { useState } from "react";

export interface TFilterState {
  category: number;
  min_price: number;
  max_price: number;
  color: string[];
  size: string[];
}

export const initialFiterState = {
  category: "",
  min_price: 500,
  max_price: 1500,
  color: [],
  size: [],
};

const useFilterActions = () => {
  const [filterControler, setFilterControler] = useState(initialFiterState);

  /* ------------------------ */
  /*      On Apply Filter     */
  /* ------------------------ */
  const onApplyFilter = () => {};

  return { filterControler, setFilterControler, onApplyFilter };
};

export { useFilterActions };
