"use client";
import React, { useContext } from "react";
import { ChangeProductCount, EsraButton } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useShowProductActions } from "../helpers/useShowProductActions";
import { TColor, TProduct, TSize } from "@/types";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@prisma/client";
import { CartContext, TCart } from "../../local-cart";

interface Props {
  product: TProduct & {
    ProductVariant: ProductVariant[];
  };
}
export default function ProductInfo({ product }: Props) {
  let info: any = {};

  product.ProductVariant.forEach(({ colorId, ...variant }) => {
    if (variant.stock <= 0) {
      return;
    }
    info[colorId] = [...(info[colorId] || []), variant];
  });

  const pro = Object.values(info).flat() as any;

  const [variant, setVariant] = React.useState<any>(Object.values(info).flat());

  const [stock, setStock] = React.useState(
    info[pro[0]?.color?.id]?.[0]?.stock || 0
  );

  const t = useTranslations("common");

  const { setProductControler, productControler } = useShowProductActions();

  const onChangeProductQty = (type: "inc" | "dec") => {
    if (type === "dec") {
      productControler.qty > 1 &&
        setProductControler({
          ...productControler,
          qty: productControler.qty - 1,
        });
    } else
      stock > productControler.qty &&
        setProductControler({
          ...productControler,
          qty: productControler.qty + 1,
        });
  };

  const cart = useContext<TCart | null>(CartContext);

  const { addCartItem } = cart as TCart;

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col max-md:ms-0">
      <div className="flex flex-col mt-1.5 max-md:mt-8 max-md:max-w-full">
        {/* Main Information */}
        <h1
          className={cn("text-lg font-medium max-md:max-w-full", {
            "text-red-500": stock === 0,
            "text-green-500": stock > 0,
          })}
        >
          {stock === 0 ? t("sold_out") : `${t("stock")} ${stock}`}
        </h1>
        <div className="flex gap-5 justify-between mt-2 w-full font-medium text-primary-100 max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-lg">
            <span className="">
              {t("home")} / {t("products")} /{" "}
            </span>
            <span className="text-3xl text-primary-100">
              {product.categories[0]?.name}
            </span>
          </div>
          <div className="flex gap-2 justify-between text-3xl text-right whitespace-nowrap">
            <div
              className={cn("", {
                "line-through text-primary-100/50 px-2": product.newPrice,
              })}
            >
              {product.price}
            </div>

            {product.newPrice && (
              <div className="font-bold">{product.newPrice}</div>
            )}

            <div>{t("LE")}</div>
          </div>
        </div>
        <div className="mt-5 text-3xl font-medium text-zinc-800 max-md:max-w-full">
          {product.name}
        </div>
        {!variant ? (
          <div className="mt-5 text-3xl font-medium text-red-900 max-md:max-w-full">
            {t("out_of_stock")}
          </div>
        ) : (
          <>
            {/* Produtc Size */}
            <h1 className="mt-7 text-lg text-zinc-800 max-md:max-w-full">
              {t("size")}
            </h1>
            <div className="grid grid-cols-5 pr-10 mt-1 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
              {variant?.map(({ size, stock }: any) => (
                <button
                  key={size.id}
                  className={cn(
                    "text-center  p-2 border border-solid border-stone-300 uppercase",
                    { "bg-[#dcdcdc]": productControler.size?.id === size.id }
                  )}
                  onClick={() => {
                    setProductControler({ ...productControler, size, qty: 1 });
                    setStock(stock);
                  }}
                >
                  {size.name}
                </button>
              ))}
            </div>

            {/* Product Color */}
            <h1 className="self-start mt-3 text-lg text-zinc-800">
              {t("color")}
            </h1>
            <div className="flex gap-3 mt-1">
              {Object.values(info).map((item: any) => (
                <button
                  key={item[0].color.id}
                  className={cn(
                    "shrink-0 border-2 border-solid border-white h-[37px] w-[37px]",
                    {
                      "border-[2px] border-[#186718]":
                        productControler.color?.id === item[0].color.id,
                    }
                  )}
                  style={{ background: item[0].color.hexCode }}
                  onClick={() => {
                    setProductControler({
                      color: item[0].color,
                      size: item[0].size,
                      qty: 1,
                    });
                    setVariant(info[item[0].color.id]);
                    setStock(info[item[0].color.id][0].stock);
                  }}
                ></button>
              ))}
            </div>

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
                disabled={stock === 0}
                className="flex-1 p-2 text-base font-bold leading-6 text-white max-md:px-5"
                onClick={() =>
                  addCartItem(
                    product,
                    productControler.qty,
                    productControler.color as TColor,
                    productControler.size as TSize
                  )
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
