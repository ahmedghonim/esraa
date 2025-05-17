"use client";
import { ProductCard } from "@/components/ui";
import Carousal from "@/components/ui/carousal";
import EsraSectionTitle from "@/components/ui/section-title";
import { Button } from "@/ui/button";
import { Color, Product, Size } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  data: Array<
    Product & { sizes: Size[] } & { colors: Color[]; ProductVariant: any }
  >;
};

export default function OurProducts({ data }: Props) {
  const t = useTranslations("common");

  /* ------------------------ */
  /*     See more function    */
  /* ------------------------ */
  const onSeeMore = () => {};

  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title={t("our_products")} href="/products" />

      <Carousal
        slides={data}
        className="mt-[14px]"
        component={(item) => <ProductCard {...item} key={item.id} />}
      />

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
