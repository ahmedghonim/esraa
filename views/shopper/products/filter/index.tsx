"use client";
import React, { createContext } from "react";
import Categories from "./categories";
import Price from "./price";
import Colors from "./colors";
import Sizes from "./sizes";
import { EsraButton } from "@/components/ui";
import {
  initialFiterState,
  useFilterActions,
} from "./helpers/useFilterActions";
import { Category, Collection, Color, Size } from "@prisma/client";

type Props = {
  color: Color[];
  category: Category[];
  sizes: Size[];
  collection: Collection[];
};
export const FilterContext = createContext<any>(null);

export default function Filter({ color, category, sizes, collection }: Props) {
  const { filterControler, setFilterControler, onApplyFilter } =
    useFilterActions();

  return (
    <section className="lg:col-span-3 col-span-12 flex flex-col gap-4">
      <FilterContext.Provider
        value={{ filterControler, setFilterControler } as any}
      >
        <Categories category={category} />

        <Price />

        <Colors color={color} />

        <Sizes sizes={sizes} />

        <EsraButton
          name="Apply Filter"
          className="py-2 text-white"
          onClick={onApplyFilter}
        />

        <EsraButton
          name="Reset"
          className="bg-transparent border-[2px] border-primary-100 py-2"
          onClick={() => setFilterControler(initialFiterState)}
        />
      </FilterContext.Provider>
    </section>
  );
}
