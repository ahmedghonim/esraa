import { getHeroSection } from "@/actions/heroSection";
import { getAllProducts } from "@/actions/product";
import { Product } from "@/schema";
import HeroSectionForm from "@/views/forms/hero-section-form";
import { getTranslations } from "next-intl/server";

async function HeroSection({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = await getTranslations("common");
  const productsData = await getAllProducts({ pageSize: 1000 });
  const values = (await getHeroSection()) as any;

  return (
    <HeroSectionForm
      values={values}
      products={productsData.products as unknown as Product[]}
    />
  );
}

export default HeroSection;
