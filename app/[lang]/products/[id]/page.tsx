import { getProductById } from "@/actions/product";
import ProductExtraInfo from "@/views/shopper/show-product/product-extra-info";
import ProductGallery from "@/views/shopper/show-product/product-gallery";
import ProductInfo from "@/views/shopper/show-product/product-info";
import SimilarProducts from "@/views/shopper/show-product/similar-products";
import React from "react";
export async function generateMetadata({
  params: { lang, id },
}: {
  params: {
    lang: any;
    id: string;
  };
}) {
  const data = await getProductById(+id);
  return {
    title: data?.name || "Esra Modest Wear",
    description: data?.description || "Esra Modest Wear",
    image: data?.thumbnail,
    alternates: {
      canonical: lang === "en" ? `/products/${id}` : `/${lang}/products/${id}`,
      languages: {
        en: `/products/${id}`,
        "en-US": `/products/${id}`,
        "en-au": `/products/${id}`,
        "en-bz": `/products/${id}`,
        "en-ca": `/products/${id}`,
        "en-ie": `/products/${id}`,
        "en-jm": `/products/${id}`,
        "en-nz": `/products/${id}`,
        "en-za": `/products/${id}`,
        "en-tt": `/products/${id}`,
        "en-gb": `/products/${id}`,
        "en-us": `/products/${id}`,
        "ar-AR": `/ar/products/${id}`,
        "ar-dz": `/ar/products/${id}`,
        "ar-bh": `/ar/products/${id}`,
        "ar-eg": `/ar/products/${id}`,
        "ar-iq": `/ar/products/${id}`,
        "ar-jo": `/ar/products/${id}`,
        "ar-kw": `/ar/products/${id}`,
        "ar-lb": `/ar/products/${id}`,
        "ar-ly": `/ar/products/${id}`,
        "ar-ma": `/ar/products/${id}`,
        "ar-om": `/ar/products/${id}`,
        "ar-qa": `/ar/products/${id}`,
        "ar-sa": `/ar/products/${id}`,
        "ar-sy": `/ar/products/${id}`,
        "ar-tn": `/ar/products/${id}`,
        "ar-ae": `/ar/products/${id}`,
        "ar-ye": `/ar/products/${id}`,
      },
    },
    openGraph: {
      title: data?.name || "Esra Modest Wear",
      url: `https://www.esramodestwear.com/${lang}/products/${id}`,
      type: "article",
      images: [
        {
          url: data?.thumbnail,
          width: 144,
          height: 144,

          alt: data?.name,
        },
      ],
    },
  };
}
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
