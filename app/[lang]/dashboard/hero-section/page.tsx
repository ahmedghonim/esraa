import { getHeroSection } from "@/actions/heroSection";
import { getAllProducts } from "@/actions/product";
import { getTranslations } from "next-intl/server";
import HeroSectionForm from "@/views/forms/hero-section-form";
async function HeroSection({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = await getTranslations("common");
  const products = (await getAllProducts()) as any;
  const values = (await getHeroSection()) as any;
  return <HeroSectionForm values={values} products={products} />;
}

export default HeroSection;
