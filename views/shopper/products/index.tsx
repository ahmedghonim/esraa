"use client";

import React, { useState } from "react";
import Filter from "./filter";
import ProductsList from "./products-list";
import { Category, Collection, Color, Product, Size } from "@prisma/client";
import { useFilterActions } from "./filter/helpers/useFilterActions";
import { FilterIcon } from "lucide-react";
interface Props {
  color: Color[];
  category: Category[];
  sizes: Size[];
  collection: Collection[];
  data: Array<
    Product & { sizes: Size[] } & { colors: Color[] } & {
      price: number;
      category: { id: number };
    }
  >;
}

export default function Products({
  color,
  category,
  sizes,
  collection,
  data,
}: Props) {
  const {
    filterControler,
    products,
    onResetFilter,
    setSearchValue,
    setFilterControler,
    onApplyFilter,
  } = useFilterActions(data);
  const [open, setOpen] = useState(true);
  return (
    <section className="mt-[55px] grid grid-cols-12 gap-5">
      <button onClick={() => setOpen(!open)}>
        <FilterIcon />
      </button>
      {!open && (
        <Filter
          color={color}
          category={category}
          collection={collection}
          sizes={sizes}
          filterControler={filterControler}
          onResetFilter={onResetFilter}
          setFilterControler={setFilterControler as any}
          onApplyFilter={onApplyFilter}
        />
      )}

      <ProductsList data={products} setSearchValue={setSearchValue} />
    </section>
  );
}
