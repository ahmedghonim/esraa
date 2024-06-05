import React from "react";
import IntroSection from "./intro-section";
import Sale from "./sale";
import Categories from "./categories";
import NewArrivals from "./new-arrival";
import OurProducts from "./our-products";
import CustomerSupport from "./customer-support";
import Testimonials from "./testimonials";
import { getHeroSection } from "@/actions/heroSection";
import { getAllSaleSliders } from "@/actions/slae";
import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import { getAllWhatTheSays } from "@/actions/whatStay";

type Props = {};

export default async function Home({}: Props) {
  const heroSection = (await getHeroSection()) as any;
  const sale = (await getAllSaleSliders({ notHidden: true })) as any;
  const category = (await getAllCategories({ top: true })) as any;
  const ourProducts = (await getAllProducts()) as any;
  const newArrivals = ourProducts.filter(
    (product: any) => product.newArrival
  ) as any;
  const whatTheySay = (await getAllWhatTheSays({ notHidden: true })) as any;
  return (
    <>
      <IntroSection data={heroSection} />
      <Sale data={sale} />
      <Categories data={category} />
      <NewArrivals data={newArrivals} />
      <OurProducts data={ourProducts} />
      <CustomerSupport />

      <Testimonials data={whatTheySay} />
    </>
  );
}
