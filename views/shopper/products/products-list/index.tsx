"use client";
import {
  EsraButton,
  EsraInput,
  EsraPagination,
  EsraSelect,
  ProductCard,
} from "@/components/ui";
import React, { useContext } from "react";
import Search from "@/svg/search.svg";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { TProduct } from "@/types";
import { Color, Product, Size } from "@prisma/client";
type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
};

export default function ProductsList({ data }: Props) {
  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some((item) => item.id === id);
  };

  const onAddToCart = (product: TProduct, isSelected: boolean) => {
    if (isSelected) {
      // toast info message that the product is selected
      return;
    }

    setCart({ ...cart, items: [...cart.items, product] });
  };

  const searchResult = 5;

  const options = [
    { label: "Test Option", value: "1" },
    { label: "Test Option", value: "2" },
    { label: "Test Option", value: "3" },
    { label: "Test Option", value: "4" },
  ];

  return (
    <section className="lg:col-span-9 col-span-12">
      {/* search */}
      <div className="flex justify-between items-center">
        <EsraInput
          placeholder="Search for any product"
          startContent={<Search />}
          wrapperClassName="!flex-1"
        />

        <EsraButton name="Search" className="text-white w-[150px] p-2" />
      </div>

      {/* sort */}
      <div className="flex justify-between items-center my-6">
        <div className="text-lg">
          <span className="text-primary-300">Search Results:</span>{" "}
          <span className="font-bold text-primary-700">{searchResult}</span>
        </div>

        <div>
          <EsraSelect options={options} placeholder="Sort By" />
        </div>
      </div>

      {/* products list */}
      <div className="grid md:grid-cols-3 gap-5 mt-[14px] mb-8">
        {data.map((item, index) => (
          <ProductCard
            key={item.id}
            {...item}
            isSelected={isItemSelected(0)}
            onAddToCart={() => onAddToCart(item, isItemSelected(0))}
          />
        ))}
      </div>

      <EsraPagination pagesCount={5} page={1} setPage={() => {}} />
    </section>
  );
}
