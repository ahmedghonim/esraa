import React from "react";
import { EsraLink } from "@/components/ui";
type Props = {};

export default function EmptyCart({}: Props) {
  return (
    <section className="flex flex-col items-center text-base max-w-[408px] mx-auto mt-[110px]">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d639429a31ef9fe3692b1c2b05155367e18dff1d986b95307585ef16dccf645b?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&"
        className="w-full aspect-[1.37] max-w-[290px]"
      />
      <h1 className="mt-6 w-full md:text-4xl text-2xl text-black whitespace-nowrap text-center">
        Your Cart Is Empty and Sad
      </h1>
      <h2 className="mt-1.5 text-[#807D7E]">Add something to make it happy!</h2>

      <EsraLink
        name="Add Products"
        href="/products"
        className="justify-center p-2 mt-6 font-bold text-white capitalize bg-primary-100 leading-[140%] w-[147px]"
      />
    </section>
  );
}
