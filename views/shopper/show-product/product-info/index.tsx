"use client";
import React from "react";
import { ChangeProductCount, EsraButton } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useShowProductActions } from "../helpers/useShowProductActions";
import { TProduct } from "@/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  product: TProduct;
}
export default function ProductInfo({ product }: Props) {
  const t = useTranslations("common");

  const { toast } = useToast();

  const {
    onAddToCart,
    onChangeQty,
    isItemSelected,
    setProductControler,
    productControler,
  } = useShowProductActions();

  const onChangeProductQtyWithoutCart = (type: "inc" | "dec") => {
    if (type === "dec") {
      productControler.qty > 1 &&
        setProductControler({
          ...productControler,
          qty: productControler.qty - 1,
        });
    } else
      setProductControler({
        ...productControler,
        qty: productControler.qty + 1,
      });
  };

  const onChangeProductQty = (id: number, type: "inc" | "dec") => {
    if (!productControler.color) {
      return toast({
        title: "Select The Color",
        description: "Please Select The Product Color",
      });
    }

    if (!productControler.size) {
      return toast({
        title: "Select The Size",
        description: "Please Select The Product Size",
      });
    }

    if (isItemSelected(id)) {
      onChangeQty(id, type);
      onChangeProductQtyWithoutCart(type);
    } else onChangeProductQtyWithoutCart(type);
  };

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col ml-5 max-md:ml-0">
      <div className="flex flex-col mt-1.5 max-md:mt-8 max-md:max-w-full">
        {/* Main Information */}
        <h1 className="text-lg font-medium text-green-600 max-md:max-w-full">
          {t("stoke")} {product.stoke}
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
            <div>LE</div>
          </div>
        </div>
        <div className="mt-5 text-3xl font-medium text-zinc-800 max-md:max-w-full">
          {product.name}
        </div>

        {/* Produtc Size */}
        <h1 className="mt-7 text-lg text-zinc-800 max-md:max-w-full">
          {t("size")}
        </h1>
        <div className="grid grid-cols-5 pr-10 mt-1 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          {product.sizes.map((size) => (
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
        </div>

        {/* Product Color */}
        <h1 className="self-start mt-3 text-lg text-zinc-800">{t("color")}</h1>
        <div className="flex gap-3 mt-1">
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
        </div>

        {/* Product Pieces */}
        <h1 className="mt-2.5 text-lg text-zinc-800 max-md:max-w-full">
          {t("pieces")}
        </h1>

        <div className="flex justify-start">
          <ChangeProductCount
            qty={productControler.qty}
            onDecrease={() => onChangeProductQty(product.id, "dec")}
            onIncrease={() => onChangeProductQty(product.id, "inc")}
          />
        </div>

        {/* Product Actions */}
        <div className="flex gap-3.5 mt-3">
          <EsraButton
            name={
              isItemSelected(product.id) ? "Remove From Cart" : "Add To Cart"
            }
            className="flex-1 p-2 text-base font-bold leading-6 text-white max-md:px-5"
            onClick={() => onAddToCart(product)}
          />
        </div>
      </div>
    </div>
  );
}
