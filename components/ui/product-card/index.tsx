import { Link } from "@/utils/navigation";

import React from "react";
import { EsraButton } from "../button";
import Favorite from "@/svg/favorite.svg";
interface Props {
  id: number;
  name: string;
  price: number;
  colors: string[];
  isSelected: boolean;
  onAddToCart: () => void;
}

export function ProductCard({
  id,
  isSelected,
  name,
  price,
  colors,
  onAddToCart,
}: Props) {
  return (
    <Link
      href={`/products/view-product?id=${id}`}
      className="flex flex-col md:max-w-[243px]"
    >
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3b065688ebab8fef614c196532aa35a8cda54348783ddd0c878e4bc05f45d713?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&"
        className="w-full aspect-[0.91]"
      />
      <div className="flex gap-5 justify-between mt-2 text-lg font-bold leading-6 capitalize">
        <div className="text-zinc-800">{name}</div>
        <div className="text-primary-100">{price} LE</div>
      </div>
      <div className="flex gap-1 pr-20 mt-1">
        {colors.map((color) => (
          <div
            key={color}
            className={"shrink-0 w-4 h-4"}
            style={{ background: color }}
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
