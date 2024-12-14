"use client";
import React, { createContext } from "react";
import Categories from "./categories";
import Price from "./price";
import Colors from "./colors";
import Sizes from "./sizes";
import { EsraButton } from "@/components/ui";
import { TFilterState } from "./helpers/useFilterActions";
import { Category, Collection, Color, Size } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  color: Color[];
  category: Category[];
  sizes: Size[];
  collection: Collection[];
  filterControler: any;
  setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  onApplyFilter: () => void;
  onResetFilter: () => void;
};
export const FilterContext = createContext<any>(null);

export default function Filter({
  color,
  category,
  sizes,
  filterControler,
  setFilterControler,
  onResetFilter,
  onApplyFilter,
}: Props) {
  const t = useTranslations("common");

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
          name={t("apply_filter")}
          className="py-2 text-white"
          onClick={onApplyFilter}
        />

        <EsraButton
          name={t("reset")}
          className="bg-transparent border-[2px] border-primary-100 py-2"
          onClick={onResetFilter}
        />
      </FilterContext.Provider>
    </section>
  );
}
