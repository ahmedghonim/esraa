"use client";
import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
import { TFilterState } from "../helpers/useFilterActions";
import { FilterContext } from "..";
import clsx from "clsx";
import { Size } from "@prisma/client";

interface Props {
  sizes: Size[];
}

export const sizesData = [
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "3xl",
  "4xl",
];

export default function Sizes({ sizes }: Props) {
  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  /* ------------------------*/
  /*    on filter by size    */
  /* ------------------------*/
  const onSelectSize = (size: string) => {
    const isSizeExist = filterControler.size.some(
      (choosed_size) => choosed_size === (size as never)
    );
    if (isSizeExist) {
      const filteredSizes = filterControler.size.filter(
        (choosed_size) => choosed_size !== (size as never)
      );
      setFilterControler({
        ...filterControler,
        size: filteredSizes,
      });

      return;
    }

    setFilterControler({
      ...filterControler,
      size: [...(filterControler.size as never), size],
    });
  };

  return (
    <CollapseCard title={"Sizes"}>
      <div className="grid grid-cols-3 gap-4">
        {sizes.map((size, index) => (
          <button
            key={index}
            className={clsx(
              "uppercase border-[1px] border-secondary-600  py-1 text-primary-300 duration-300",
              {
                "bg-primary-100 text-white font-bold":
                  filterControler.size.includes(size.name as never),
              }
            )}
            onClick={() => onSelectSize(size.name)}
          >
            {size.name}
          </button>
        ))}
      </div>
    </CollapseCard>
  );
}
