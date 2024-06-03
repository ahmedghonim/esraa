"use client";

import { CollapseCard } from "@/components/ui";
import React, { useContext } from "react";
import { FilterContext } from "..";
import clsx from "clsx";
import { TFilterState } from "../helpers/useFilterActions";

type Props = {};

const dummyCateories = [
  {
    id: 1,
    name: "Test Caregory",
  },
  {
    id: 2,
    name: "Test Caregory",
  },
  {
    id: 3,
    name: "Test Caregory",
  },
  {
    id: 4,
    name: "Test Caregory",
  },
  {
    id: 5,
    name: "Test Caregory",
  },
];

export default function Categories({}: Props) {
  const { filterControler, setFilterControler } = useContext<{
    filterControler: TFilterState;
    setFilterControler: React.Dispatch<React.SetStateAction<TFilterState>>;
  }>(FilterContext);

  return (
    <CollapseCard title={"Categories"}>
      {dummyCateories.map((category) => (
        <button
          key={category.id}
          className={clsx("block text-[#807D7E] text-lg duration-300", {
            "font-bold": filterControler.category === category.id,
          })}
          onClick={() =>
            setFilterControler({ ...filterControler, category: category.id })
          }
        >
          {category.name}
        </button>
      ))}
    </CollapseCard>
  );
}
