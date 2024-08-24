"use client";
import React from "react";
import { ChangeProductCount, EsraButton } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useShowProductActions } from "../helpers/useShowProductActions";
import { TProduct } from "@/types";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@prisma/client";

interface Props {
  product: TProduct & {
    ProductVariant: ProductVariant[];
  };
}
export default function ProductInfo({ product }: Props) {
  const [variant, setVariant] = React.useState(product.ProductVariant[0]);

  const t = useTranslations("common");

  const { onAddToCart, setProductControler, productControler } =
    useShowProductActions();

  const onChangeProductQty = (type: "inc" | "dec") => {
    if (type === "dec") {
      productControler.qty > 1 &&
        setProductControler({
          ...productControler,
          qty: productControler.qty - 1,
        });
    } else
      product.stock > productControler.qty &&
        setProductControler({
          ...productControler,
          qty: productControler.qty + 1,
        });
  };

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col max-md:ml-0">
      <div className="flex flex-col mt-1.5 max-md:mt-8 max-md:max-w-full">
        {/* Main Information */}
        <h1
          className={cn("text-lg font-medium max-md:max-w-full", {
            "text-red-500": product.stock === 0,
            "text-green-500": product.stock > 0,
          })}
        >
          {t("stock")} {product.stock}
        </h1>
        <div className="flex gap-5 justify-between mt-2 w-full font-medium text-primary-100 max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-lg">
            <span className="">
              {t("home")} / {t("products")} /{" "}
            </span>
            <span className="text-3xl text-primary-100">
              {product.categories[0].name}
            </span>
          </div>
          <div className="flex gap-2 justify-between text-3xl text-right whitespace-nowrap">
            <div>{product.price}</div>
            <div>{t("LE")}</div>
          </div>
        </div>
        <div className="mt-5 text-3xl font-medium text-zinc-800 max-md:max-w-full">
          {product.name}
        </div>

        {/* Produtc Size */}
        <h1 className="mt-7 text-lg text-zinc-800 max-md:max-w-full">
          {t("size")}
        </h1>
        {/* <div className="grid grid-cols-5 pr-10 mt-1 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          {product.ProductVariant.map(({size}) => (
            <button
              key={size.id}
              className={cn(
                "text-center  p-2 border border-solid border-stone-300 uppercase",
                { "bg-[#dcdcdc]": productControler.size?.id === size.id }
              )}
              onClick={() => setProductControler({ ...productControler, size })}
            >
              {size.name}
            </button>
          ))}
        </div> */}

        {/* Product Color */}
        <h1 className="self-start mt-3 text-lg text-zinc-800">{t("color")}</h1>
        {/* <div className="flex gap-3 mt-1">
          {product.colors.map((color) => (
            <button
              key={color.id}
              className={cn(
                "shrink-0 border-2 border-solid border-zinc-600 h-[37px] w-[37px]",
                {
                  "border-[2px] border-[#dcdcdc]":
                    productControler.color?.id === color.id,
                }
              )}
              style={{ background: color.hexCode }}
              onClick={() =>
                setProductControler({ ...productControler, color })
              }
            />
          ))}
        </div> */}

        {/* Product Pieces */}
        <h1 className="mt-2.5 text-lg text-zinc-800 max-md:max-w-full">
          {t("pieces")}
        </h1>

        <div className="flex justify-start">
          <ChangeProductCount
            qty={productControler.qty}
            onDecrease={() => onChangeProductQty("dec")}
            onIncrease={() => onChangeProductQty("inc")}
          />
        </div>

        {/* Product Actions */}
        <div className="flex gap-3.5 mt-3">
          <EsraButton
            name={t("add_to_cart")}
            // disabled={product.stock === 0}
            className="flex-1 p-2 text-base font-bold leading-6 text-white max-md:px-5"
            onClick={() => onAddToCart(product)}
          />
        </div>
      </div>
    </div>
  );
}
