import { getAllCategories } from "@/actions/category";
import { getAllCollections } from "@/actions/collection";
import { getAllColors } from "@/actions/color";
import { getAllProducts } from "@/actions/product";
import { getAllSizes } from "@/actions/size";
import Products from "@/views/shopper/products";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    categories?: string;
    sale?: string;
    newarrival?: string;
    min_price?: string;
    max_price?: string;
    page?: string;
    pageSize?: string;
    search?: string;
  };
}) {
  // Parse query parameters
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 12;

  const filters = {
    categories: searchParams.categories
      ? parseInt(searchParams.categories)
      : undefined,
    sale: searchParams.sale === "true",
    newarrival: searchParams.newarrival === "true",
    minPrice: searchParams.min_price
      ? parseInt(searchParams.min_price)
      : undefined,
    maxPrice: searchParams.max_price
      ? parseInt(searchParams.max_price)
      : undefined,
    search: searchParams.search,
    page,
    pageSize,
  };

  // Fetch data with filters
  const data = await getAllProducts(filters);

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
      data={data.products as any}
      initialFilters={filters}
      pagination={data.pagination}
    />
  );
}
