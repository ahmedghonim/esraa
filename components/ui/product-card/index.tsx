import { cn } from "@/lib/utils";
import { Color } from "@/schema";
import { Link } from "@/utils/navigation";
import { Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { EsraLink } from "../link";
interface Props extends Product {
  id: number;
  colors: Color[];
  ProductVariant: any;
}

export function ProductCard({
  id,
  name,
  price,
  colors,
  ProductVariant,
  thumbnail,
  newPrice,
  ...props
}: Props) {
  const t = useTranslations("common");

  return (
    <div className="flex relative flex-col w-full h-full">
      <Link href={`/products/${id}`} className="h-full">
        <Image
          alt="product image"
          width={2000}
          height={2000}
          loading="lazy"
          src={thumbnail || "/product.png"}
          className="w-full  h-full object-cover object-center"
        />
        {ProductVariant?.every((item: any) => item.stock === 0) && (
          <h2
            className={cn(
              "absolute text-[16px] top-[15px] -translate-y-1/3 left-[52px] -translate-x-1/2 bg-white text-red-700 p-1 rounded-sm font-bold"
            )}
          >
            {t("sold_out")}
          </h2>
        )}
      </Link>
      <div className="flex gap-2 justify-between mt-5 text-lg font-bold leading-6 capitalize">
        <div className="text-zinc-800">{name}</div>
        <div className="flex flex-col items-center">
          {!!newPrice && <div className="font-bold">{newPrice}</div>}
          <div
            className={cn("", {
              "line-through text-primary-100 font-medium": newPrice,
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
