"use client";

import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
import { FilterContext } from "..";
import clsx from "clsx";
import { TFilterState } from "../helpers/useFilterActions";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  category: Category[];
};

export default function Categories({ category }: Props) {
  const t = useTranslations("common");
  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  return (
    <CollapseCard title={t("categories")}>
      {category?.map((category) => (
        <button
          key={category.id}
          className={clsx("block text-[#807D7E] text-lg duration-300", {
            "font-bold": filterControler.category === category.id,
          })}
          onClick={() =>
            setFilterControler({ ...filterControler, category: category.id })
          }
        >
          {category.name} ({category.products.length})
        </button>
      ))}
    </CollapseCard>
  );
}
