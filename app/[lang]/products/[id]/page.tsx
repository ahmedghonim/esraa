import { getProductById } from "@/actions/product";
import ProductExtraInfo from "@/views/shopper/show-product/product-extra-info";
import ProductGallery from "@/views/shopper/show-product/product-gallery";
import ProductInfo from "@/views/shopper/show-product/product-info";
import SimilarProducts from "@/views/shopper/show-product/similar-products";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function ViewProductPage({ params: { id } }: Props) {
  const data = (await getProductById(+id)) as any;
  return (
    <main className="mt-[95px]">
      <section className="grid grid-cols-12">
        <ProductGallery images={[data?.thumbnail, ...data.images]} />

        <ProductInfo {...data} />
      </section>

      <ProductExtraInfo description={data?.description || ""} />

      {data?.relatedProducts && (
        <SimilarProducts data={data?.relatedProducts} />
      )}
    </main>
  );
}
