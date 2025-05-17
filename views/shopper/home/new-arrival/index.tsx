"use client";
import { ProductCard } from "@/components/ui";
import Carousal from "@/components/ui/carousal";
import EsraSectionTitle from "@/components/ui/section-title";
import { Color, Product, Size } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  data: Array<
    Product & { sizes: Size[] } & { colors: Color[]; ProductVariant: any }
  >;
};

export default function NewArrivals({ data }: Props) {
  const t = useTranslations("common");
  return (
    <section className="flex flex-col font-bold leading-[150%] md:mt-[45px] mt-7">
      <EsraSectionTitle
        title={t("new_arrival")}
        href="/products?newarrival=true"
      />

      <Carousal
        slides={data}
        className="mt-[14px]"
        component={(item) => <ProductCard {...item} key={item.id} />}
      />
    </section>
  );
}
