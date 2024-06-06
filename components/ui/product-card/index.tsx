import { Link } from "@/utils/navigation";

import React from "react";
import Favorite from "@/svg/favorite.svg";
import Image from "next/image";
import { EsraButton } from "../esra_button";
import { Product } from "@prisma/client";
import { Color, Size } from "@/schema";
interface Props extends Product {
  id: number;
  name: string;
  price: number;
  sizes: Size[];
  colors: Color[];
  isSelected?: boolean;
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  isSelected,
  name,
  price,
  colors,
  thumbnail,
  onAddToCart,
}: Props) {
  return (
    <Link href={`/products/${id}`} className="flex flex-col md:max-w-[243px]">
      <Image
        alt="product image"
        width={2000}
        height={2000}
        loading="lazy"
        src={thumbnail || "/product.png"}
        className="w-full aspect-[0.91]"
      />
      <div className="flex gap-5 justify-between mt-2 text-lg font-bold leading-6 capitalize">
        <div className="text-zinc-800">{name}</div>
        <div className="text-primary-100">{price} LE</div>
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
        <EsraButton
          name={isSelected ? "Selected" : "Add To Cart"}
          className="justify-center p-2 text-base font-bold leading-6 text-white flex-1 !rounded-0"
          onClick={onAddToCart}
        />
        <button className="flex justify-center items-center p-2 bg-[#7397273D] h-[38px] w-[38px]">
          <Favorite />
        </button>
      </div>
    </Link>
  );
}
