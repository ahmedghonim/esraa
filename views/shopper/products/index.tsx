"use client";

import React from "react";
import Filter from "./filter";
import ProductsList from "./products-list";
import { Category, Collection, Color, Product, Size } from "@prisma/client";
import { useFilterActions } from "./filter/helpers/useFilterActions";

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

  return (
    <section className="mt-[55px] grid grid-cols-12 gap-5">
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
      <ProductsList data={products} setSearchValue={setSearchValue} />
    </section>
  );
}
