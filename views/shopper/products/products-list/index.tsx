"use client";

import {
  EsraButton,
  EsraInput,
  EsraSelect,
  ProductCard,
} from "@/components/ui";
import React, { useContext } from "react";
import Search from "@/svg/search.svg";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { TProduct } from "@/types";
import { Color, Product, Size } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  data: Array<Product & { sizes: Size[] } & { colors: Color[] }>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductsList({ data, setSearchValue }: Props) {
  const { toast } = useToast();

  const { cart, setCart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const isItemSelected = (id: number) => {
    return cart.items.some((item) => item.id === id);
  };

  const onAddToCart = (product: TProduct) => {
    if (isItemSelected(product.id)) {
      const filteredCart = cart.items.filter((item) => item.id !== product.id);

      setCart({ ...cart, items: filteredCart });
      toast({
        title: "Removed successfully",
        description: "Product removed successfully",
      });
      return;
    } else {
      setCart({
        ...cart,
        items: [...cart.items, { ...product, qty: 1, selected_size: "M" }],
      });
      toast({
        title: "Added successfully",
        description: "Product added successfully",
      });
    }
  };

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
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <EsraButton name="Search" className="text-white w-[150px] p-2" />
      </div>

      {/* sort */}
      <div className="flex justify-between items-center my-6">
        <div className="text-lg">
          <span className="text-primary-300">Search Results:</span>{" "}
          <span className="font-bold text-primary-700">{data?.length}</span>
        </div>

        <div>
          <EsraSelect options={options} placeholder="Sort By" />
        </div>
      </div>

      {/* products list */}
      <div className="grid md:grid-cols-3 gap-5 mt-[14px] mb-8">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            isSelected={isItemSelected(item.id)}
            onAddToCart={() => onAddToCart(item as any)}
          />
        ))}
      </div>
    </section>
  );
}
