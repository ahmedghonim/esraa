import React from "react";
import CustomerSupportIcon from "@/svg/customer-support.svg";
import FreeShipping from "@/svg/free-shipping.svg";
import MoneyBack from "@/svg/money-back.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
type Props = {};

export default function CustomerSupport({}: Props) {
  const t = useTranslations("common");
  return (
    <section className="flex justify-center items-center md:py-8 p-6 pb-10 bg-primary-100 mt-[45px]">
      <div className="w-full max-w-[884px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <Image
              src={"/customer-support.png"}
              width={1200}
              height={1200}
              alt="image"
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10">
              <div className="flex gap-5 items-center">
                <CustomerSupportIcon />
                <div className="flex flex-col justify-center self-start mt-2">
                  <h1 className="md:text-2xl text-base text-center font-bold leading-7 text-white">
                    {t("24/7 Customer Support")}
                  </h1>
                  <span className="mt-2 md:text-base text-sm leading-5 text-center text-neutral-200 font-Heebo">
                    {t("Friendly 24/7 Customer Support")}
                  </span>
                </div>
              </div>
              <div className="flex gap-5 items-center mt-14 max-md:mt-10">
                <MoneyBack />
                <div className="flex flex-col justify-center my-auto">
                  <h1 className="md:text-2xl text-base font-bold leading-7 text-white">
                    {t("MONEY BACK GUARANTEE")}
                  </h1>
                  <span className="mt-2 md:text-base text-sm leading-5 text-center text-neutral-200 font-Heebo">
                    {t("We Return your Money Within 7 Days")}
                  </span>
                </div>
              </div>

              <div className="flex gap-5 items-center mt-14 max-md:mt-10">
                <FreeShipping />
                <div className="flex flex-col justify-center my-auto">
                  <h1 className="md:text-2xl text-base font-bold leading-7 text-white">
                    {t("FREE AND FAST DELIVERY")}
                  </h1>
                  <span className="mt-2 md:text-base text-sm leading-5 text-center text-neutral-200 font-Heebo">
                    {t("Free delivery for all orders over 10000 LE")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
