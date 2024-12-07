import React from "react";
import IntroSection from "./intro-section";
import Sale from "./sale";
import Categories from "./categories";
import NewArrivals from "./new-arrival";
import OurProducts from "./our-products";
import CustomerSupport from "./customer-support";
import Testimonials from "./testimonials";
import { getAllSaleSliders } from "@/actions/slae";
import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import { getAllWhatTheSays } from "@/actions/whatStay";

type Props = {};

export default async function Home({}: Props) {
  const sale = (await getAllSaleSliders({ notHidden: true })) as any;
  const category = (await getAllCategories({ top: true })) as any;
  const ourProducts = (await getAllProducts()) as any;
  const newArrivals = ourProducts.filter(
    (product: any) => product.newArrival
  ) as any;
  const whatTheySay = (await getAllWhatTheSays({ notHidden: true })) as any;
  return (
    <>
      <IntroSection />
      <Sale data={sale} />
      {category.length > 0 && <Categories data={category} />}
      {newArrivals.length > 0 && <NewArrivals data={newArrivals} />}
      {ourProducts.length > 0 && <OurProducts data={ourProducts} />}
      <CustomerSupport />

      {whatTheySay.length > 0 && <Testimonials data={whatTheySay} />}
    </>
  );
}
