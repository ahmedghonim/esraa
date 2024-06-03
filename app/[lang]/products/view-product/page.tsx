import { useShowProductActions } from "@/views/shopper/show-product/helpers/useShowProductActions";
import ProductExtraInfo from "@/views/shopper/show-product/product-extra-info";
import ProductGallery from "@/views/shopper/show-product/product-gallery";
import ProductInfo from "@/views/shopper/show-product/product-info";
import SimilarProducts from "@/views/shopper/show-product/similar-products";
import React from "react";

type Props = {};

export default function ViewProductPage({}: Props) {
  const { productData } = useShowProductActions();

  return (
    <main className="mt-[95px]">
      <section className="grid grid-cols-12">
        <ProductGallery images={productData.images} />

        <ProductInfo
          price={productData.price}
          category={productData.category}
          name={productData.name}
          stock={productData.stock}
          sizes={productData.sizes}
          colors={productData.colors}
        />
      </section>

      <ProductExtraInfo
        description={productData.description}
        benifits={productData.benefits}
      />

      <SimilarProducts />
    </main>
  );
}
