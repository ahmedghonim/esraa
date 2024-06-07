"use client";
import React, { useContext } from "react";
import Favorite from "@/svg/favorite.svg";
import Share from "@/svg/share.svg";
import { ChangeProductCount, EsraButton } from "@/components/ui";
import { Link } from "@/utils/navigation";
import { Category, Color, Product, Size } from "@prisma/client";
import { useTranslations } from "next-intl";
import { CartContext, TCart } from "../../local-cart";
import { TProduct } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface Props extends Product {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}
export default function ProductInfo({
  id,
  price,
  categories,
  name,
  stoke,
  sizes,
  colors,
}: Props) {
  const t = useTranslations("common");

  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = () => {
    return cart.items.some((item) => item.id === id);
  };

  const onAddToCart = () => {
    if (isItemSelected(id)) {
      const filteredCart = cart.items.filter((item) => item.id !== id);

      setCart({ ...cart, items: filteredCart });
      toast({
        title: "Removed successfully",
        description: "Product removed successfully",
      });
      return;
    } else {
      setCart({
        ...cart,
        items: [
          ...cart.items,
          { name, stoke, sizes, colors, qty: 1, selected_size: "M" },
        ],
      });
      toast({
        title: "Added successfully",
        description: "Product added successfully",
      });
    }
  };

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col ml-5 max-md:ml-0">
      <div className="flex flex-col mt-1.5 max-md:mt-8 max-md:max-w-full">
        {/* Main Information */}
        <h1 className="text-lg font-medium text-green-600 max-md:max-w-full">
          {t("stoke")} {stoke}
        </h1>
        <div className="flex gap-5 justify-between mt-2 w-full font-medium text-primary-100 max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-lg">
            <span className="">
              {t("home")} / {t("products")} /{" "}
            </span>
            <span className="text-3xl text-primary-100">
              {categories[0].name}
            </span>
          </div>
          <div className="flex gap-2 justify-between text-3xl text-right whitespace-nowrap">
            <div>{price}</div>
            <div>LE</div>
          </div>
        </div>
        <div className="mt-5 text-3xl font-medium text-zinc-800 max-md:max-w-full">
          {name}
        </div>

        {/* Produtc Size */}
        <h1 className="mt-7 text-lg text-zinc-800 max-md:max-w-full">
          {t("size")}
        </h1>
        <div className="grid grid-cols-5 pr-10 mt-1 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          {sizes.map((size) => (
            <button
              key={size.id}
              className="text-center  p-2 border border-solid border-stone-300 uppercase"
            >
              {size.name}
            </button>
          ))}
        </div>

        {/* Product Color */}
        <h1 className="self-start mt-3 text-lg text-zinc-800">{t("color")}</h1>
        <div className="flex gap-3 mt-1">
          {colors.map((color) => (
            <button
              key={color.id}
              className="shrink-0 border-2 border-solid border-zinc-600 h-[37px] w-[37px]"
              style={{ background: color.hexCode }}
            />
          ))}
        </div>

        {/* Product Pieces */}
        <h1 className="mt-2.5 text-lg text-zinc-800 max-md:max-w-full">
          {t("pieces")}
        </h1>
        <div>
          <ChangeProductCount
            qty={1}
            onDecrease={() => {}}
            onIncrease={() => {}}
          />
        </div>

        {/* Product Actions */}
        <div className="flex gap-3.5 mt-3">
          <EsraButton
            name="Add To Cart"
            className="flex-1 p-2 text-base font-bold leading-6 text-white max-md:px-5"
          />

          {/* <button className="flex justify-center items-center p-2 bg-[#7397273D] h-[38px] w-[38px]">
            <Favorite />
          </button> */}
        </div>
        {/* 
        <div className="flex items-center gap-3.5 mt-3 max-md:flex-wrap max-md:max-w-full">
          <Link
            href={""}
            className="flex-1 p-2 text-center text-base font-bold leading-6 border-2 border-solid border-zinc-600 text-primary-100 max-md:px-5"
          >
            Order On Whatsapp
          </Link>
          <Share />
        </div> */}
      </div>
    </div>
  );
}
