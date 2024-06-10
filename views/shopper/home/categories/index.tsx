import EsraSectionTitle from "@/components/ui/section-title";
import { Category } from "@/schema";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type Props = {
  data: Category[];
};

export default function Categories({ data }: Props) {
  const t = useTranslations("common");

  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title={t("top_categories")} href="" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-[14px]">
        {data.map((item, index) => (
          <Link
            href={""}
            className="flex flex-col items-center whitespace-nowrap"
            key={index}
          >
            <Image
              src={item.image || "/category.png"}
              width={1200}
              height={1200}
              alt="category image"
            />
            <span className="mt-2">{item.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
