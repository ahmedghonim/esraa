"use client";
import { EsraButton } from "@/components/ui";
import { Category, Collection, Color, Size } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { createContext } from "react";
import Categories from "./categories";
import Colors from "./colors";
import { TFilterState } from "./helpers/useFilterActions";
import Price from "./price";
import Sizes from "./sizes";

type Props = {
  color: Color[];
  category: Category[];
  sizes: Size[];
  collection: Collection[];
  filterControler: any;
  setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  onApplyFilter: () => void;
  onResetFilter: () => void;
  isLoading: boolean;
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
  isLoading,
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
          name={isLoading ? t("loading") + "..." : t("apply_filter")}
          className="py-2 text-white"
          onClick={onApplyFilter}
          disabled={isLoading}
        />

        <EsraButton
          name={isLoading ? t("loading") + "..." : t("reset")}
          className="bg-transparent border-[2px] text-primary-100 border-primary-100 py-2"
          onClick={onResetFilter}
          disabled={isLoading}
        />
      </FilterContext.Provider>
    </section>
  );
}
