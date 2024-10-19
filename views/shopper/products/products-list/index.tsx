"use client";

import { EsraButton, EsraInput, ProductCard } from "@/components/ui";
import React from "react";
import Search from "@/svg/search.svg";
import { useTranslations } from "next-intl";

type Props = {
  data: any;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductsList({ data, setSearchValue }: Props) {
  const t = useTranslations("common");

  return (
    <section className="lg:col-span-9 col-span-12">
      {/* search */}
      <div className="flex justify-between items-center gap-2">
        <EsraInput
          placeholder={t("search_placeholder")}
          startContent={<Search />}
          wrapperClassName="!flex-1"
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <EsraButton name="Search" className="text-white w-[150px] p-2" />
      </div>

      {/* sort */}
      <div className="flex justify-between items-center my-6">
        <div className="text-lg">
          <span className="text-primary-300">{t("search_results:")}</span>{" "}
          <span className="font-bold text-primary-700">{data?.length}</span>
        </div>
      </div>

      {/* products list */}
      <div className="grid md:grid-cols-3 gap-5 mt-[14px] mb-8">
        {data.map((item: any) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
