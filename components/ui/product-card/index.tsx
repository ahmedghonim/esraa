import { Link } from "@/utils/navigation";
import React from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Color } from "@/schema";
import { EsraLink } from "../link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
interface Props extends Product {
  id: number;
  colors: Color[];
}

export function ProductCard({
  id,
  name,
  price,
  colors,
  thumbnail,
  newPrice,
}: Props) {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col md:max-w-[243px]">
      <Link href={`/products/${id}`} className="h-full">
        <Image
          alt="product image"
          width={2000}
          height={2000}
          loading="lazy"
          src={thumbnail || "/product.png"}
          className="w-full  h-full object-cover object-center"
        />
      </Link>
      <div className="flex gap-2 justify-between mt-5 text-lg font-bold leading-6 capitalize">
        <div className="text-zinc-800">{name}</div>
        <div className="flex flex-col items-center">
          {newPrice && <div className="font-bold">{newPrice}</div>}
          <div
            className={cn("", {
              "line-through text-primary-100/50": newPrice,
            })}
          >
            {price}
          </div>
        </div>

        <div>{t("LE")}</div>
      </div>
      <div className="flex gap-1 pr-20 mt-1">
        {colors?.map((color) => (
          <div
            key={color.hexCode}
            className={"shrink-0 w-4 h-4"}
            style={{ background: color.hexCode }}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-3.5">
        <EsraLink
          name={t("show_product")}
          href={`/products/${id}`}
          className="w-full bg-primary-200 text-white"
        />
      </div>
    </div>
  );
}
