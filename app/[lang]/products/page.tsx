import Filter from "@/views/shopper/products/filter";
import ProductsList from "@/views/shopper/products/products-list";
import React from "react";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <main className="mt-[55px] grid grid-cols-12 gap-5">
      <Filter />
      <ProductsList />
    </main>
  );
}
