"use client";
import { ProductCard } from "@/components/ui";
import { Button } from "@/ui/button";
import React from "react";
import EsraSectionTitle from "@/components/ui/section-title";
import { Color, Product, Size } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function OurProducts({ data }: Props) {
  const t = useTranslations("common");

  /* ------------------------ */
  /*     See more function    */
  /* ------------------------ */
  const onSeeMore = () => {};

  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title={t("our_products")} href="" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-5 mt-[14px]">
        {data.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-8 bg-transparent border-primary-100 border-[2px] text-primary-100"
        onClick={onSeeMore}
      >
        {t("see_more")}
      </Button>
    </section>
  );
}
