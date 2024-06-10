"use client";
import { ProductCard } from "@/components/ui";
import EsraSectionTitle from "@/components/ui/section-title";
import { Color, Product, Size } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function NewArrivals({ data }: Props) {
  const t = useTranslations("common");

  return (
    <section className="flex flex-col font-bold leading-[150%] md:mt-[45px] mt-7">
      <EsraSectionTitle title={t("new_arrivals")} href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
