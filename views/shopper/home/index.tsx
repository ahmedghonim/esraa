import React from "react";
import IntroSection from "./intro-section";
import Sale from "./sale";
import Categories from "./categories";
import NewArrivals from "./new-arrival";
import OurProducts from "./our-products";
import CustomerSupport from "./customer-support";
import Testimonials from "./testimonials";

type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <IntroSection />
      <Sale />
      <Categories />
      <NewArrivals />
      <OurProducts />
      <CustomerSupport />

      <Testimonials />
    </>
  );
}
