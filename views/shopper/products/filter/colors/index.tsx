"use client";

import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
import { TFilterState } from "../helpers/useFilterActions";
import { FilterContext } from "..";
import clsx from "clsx";

interface Props {}

export const colorsData = [
  { name: "Purple", hexCode: "#8434E1" },
  { name: "Black", hexCode: "#000" },
  { name: "Red", hexCode: "#F32840" },
  { name: "Orange", hexCode: "#F16F2B" },
  { name: "Navy", hexCode: "#345EFF" },
  { name: "White", hexCode: "#fff" },
  { name: "Broom", hexCode: "#D67E3B" },
  { name: "Green", hexCode: "#48BC4E" },
  { name: "Yellow", hexCode: "#FDC761" },
  { name: "Grey", hexCode: "#E4E5E8" },
  { name: "Pink", hexCode: "#E08D9D" },
  { name: "Blue", hexCode: "#3FDEFF" },
];

export default function Colors({}: Props) {
  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  /* ------------------------ */
  /*    on filter by color    */
  /* ------------------------ */
  const onSelectColor = (color: string) => {
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
    <CollapseCard title={"Colors"}>
      <div className="grid grid-cols-4 gap-4">
        {colorsData.map((color, index) => (
          <button key={index}>
            <span
              className="block h-9 w-9 mb-3 mx-auto"
              style={{ background: color.hexCode }}
              onClick={() => onSelectColor(color.hexCode)}
            />
            <span
              className={clsx("text-[#8A8989] font-Heebo block duration-300", {
                "!text-primary-100 font-bold": filterControler.color.includes(
                  color.hexCode
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
