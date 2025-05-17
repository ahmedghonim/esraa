import { getAllCategories } from "@/actions/category";
import { getHeroSection } from "@/actions/heroSection";
import { getAllProducts } from "@/actions/product";
import { getAllSaleSliders } from "@/actions/slae";
import { getAllWhatTheSays } from "@/actions/whatStay";
import Categories from "./categories";
import CustomerSupport from "./customer-support";
import IntroSection from "./intro-section";
import NewArrivals from "./new-arrival";
import OurProducts from "./our-products";
import Sale from "./sale";
import Testimonials from "./testimonials";

export default async function Home() {
  const sale = (await getAllSaleSliders({ notHidden: true })) as any;
  const category = (await getAllCategories({ top: true })) as any;

  // Get products data and handle the new structure
  const productsData = await getAllProducts({ pageSize: 20 });

  // Map the products to match the expected structure for the UI components
  const products = (productsData.products || []).map((product: any) => ({
    ...product,
    // Map ProductVariant to colors for compatibility
    colors: product.ProductVariant?.map((variant: any) => variant.color) || [],
    // Add sizes array if it doesn't exist
    sizes: product.ProductVariant?.map((variant: any) => variant.size) || [],
  }));

  // Filter new arrivals from the products array
  const newArrivals = products.filter((product: any) => product.newArrival);

  const whatTheySay = (await getAllWhatTheSays({ notHidden: true })) as any;
  const heroSection = (await getHeroSection()) as any;

  return (
    <div>
      <IntroSection data={heroSection} />
      <Sale data={sale} />
      {category.length > 0 && <Categories data={category} />}
      {newArrivals.length > 0 && <NewArrivals data={newArrivals} />}
      {products.length > 0 && <OurProducts data={products} />}
      <CustomerSupport />

      {whatTheySay.length > 0 && <Testimonials data={whatTheySay} />}
    </div>
  );
}
