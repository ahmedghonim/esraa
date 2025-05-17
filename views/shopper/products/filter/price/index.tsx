"use client";
import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
//@ts-ignore
import { useTranslations } from "next-intl";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FilterContext } from "..";
import { TFilterState } from "../helpers/useFilterActions";

interface Props {}

export default function Price({}: Props) {
  const t = useTranslations("common");
  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  return (
    <CollapseCard title={t("price")}>
      <RangeSlider
        className="!h-[3px]"
        step={100}
        min={0}
        max={10000}
        value={[filterControler.min_price, filterControler.max_price]}
        onInput={(value: number[]) =>
          setFilterControler({
            ...filterControler,
            min_price: value[0],
            max_price: value[1],
          })
        }
      />

      <div className="flex items-center justify-center gap-4 mt-4 font-Heebo text-center text-base text-primary-300">
        <div className="w-[73px] py-1 border-[1px] border-secondary-600">
          {filterControler.min_price} {t("LE")}
        </div>
        <div className="w-[73px] py-1 border-[1px] border-secondary-600">
          {filterControler.max_price} {t("LE")}
        </div>
      </div>
    </CollapseCard>
  );
}
