import { getAllCategories } from "@/actions/category";
import { getAllCollections } from "@/actions/collection";
import { getAllColors } from "@/actions/color";
import { getAllProducts } from "@/actions/product";
import { getAllSizes } from "@/actions/size";
import Products from "@/views/shopper/products";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: t("products"),
    authors: [{ name: "esramodestwear" }],
    applicationName: "esramodestwear",
    metadataBase: new URL("https://www.esramodestwear.com"),
    alternates: {
      canonical: `${lang === "en" ? "en/products" : "products"}`,
      languages: {
        en: "/en/products",
        "en-US": "/en/products",
        "en-au": "/en/products",
        "en-bz": "/en/products",
        "en-ca": "/en/products",
        "en-ie": "/en/products",
        "en-jm": "/en/products",
        "en-nz": "/en/products",
        "en-za": "/en/products",
        "en-tt": "/en/products",
        "en-gb": "/en/products",
        "en-us": "/en/products",
        "ar-AR": "/products",
        "ar-dz": "/products",
        "ar-bh": "/products",
        "ar-eg": "/products",
        "ar-iq": "/products",
        "ar-jo": "/products",
        "ar-kw": "/products",
        "ar-lb": "/products",
        "ar-ly": "/products",
        "ar-ma": "/products",
        "ar-om": "/products",
        "ar-qa": "/products",
        "ar-sa": "/products",
        "ar-sy": "/products",
        "ar-tn": "/products",
        "ar-ae": "/products",
        "ar-ye": "/products",
      },
    },

    openGraph: {
      type: "website",
      title: "Esra Modestwear",
      url: `https://www.esramodestwear.com/${lang}`,
      siteName: "esramodestwear",
      images: [
        {
          url: "./logo.jpg",
          width: 800,
          height: 600,
          alt: "esramodestwear",
        },
      ],
    },
  };
}

export default async function ProductsPage() {
  const data = (await getAllProducts()) as any;

  const color = await getAllColors();

  const category = await getAllCategories({});

  const collection = await getAllCollections();

  const sizes = await getAllSizes();

  return (
    <Products
      color={color}
      category={category}
      sizes={sizes}
      collection={collection}
      data={data}
    />
  );
}
