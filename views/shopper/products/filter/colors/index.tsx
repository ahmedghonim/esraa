"use client";

import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
import { TFilterState } from "../helpers/useFilterActions";
import { FilterContext } from "..";
import clsx from "clsx";
import { Color } from "@prisma/client";
import { useTranslations } from "next-intl";

interface Props {
  color: Color[];
}

export default function Colors({ color }: Props) {
  const t = useTranslations("common");

  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  /* ------------------------ */
  /*    on filter by color    */
  /* ------------------------ */
  const onSelectColor = (color: number) => {
    const isColorExist = filterControler.color.some(
      (choosed_color) => choosed_color === color
    );
    if (isColorExist) {
      const filteredColors = filterControler.color.filter(
        (choosed_color) => choosed_color !== color
      );
      setFilterControler({
        ...filterControler,
        color: filteredColors,
      });

      return;
    }

    setFilterControler({
      ...filterControler,
      color: [...filterControler.color, color],
    });
  };

  return (
    <CollapseCard title={t("colors")}>
      <div className="grid grid-cols-4 gap-4">
        {color?.map((color, index) => (
          <button key={index}>
            <span
              className="block h-9 w-9 mb-3 mx-auto"
              style={{ background: color.hexCode }}
              onClick={() => onSelectColor(color.id)}
            />
            <span
              className={clsx("text-[#8A8989] font-Heebo block duration-300", {
                "!text-primary-100 font-bold": filterControler.color.includes(
                  color.id as never
                ),
              })}
            >
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </CollapseCard>
  );
}
