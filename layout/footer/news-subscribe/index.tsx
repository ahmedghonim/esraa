"use client";
import React, { useState } from "react";
import Logo from "@/svg/logo.svg";
import RightArrow from "@/svg/right-short-arrow.svg";
import { EsraInput } from "@/components/ui";
import { useTranslations } from "next-intl";

type Props = {};

export default function NewsSubscribe({}: Props) {
  const t = useTranslations("common");
  const [email, setEmail] = useState<string>("");

  /* ------------------------ */
  /*     Subscribe to news    */
  /* ------------------------ */
  const onSubscribe = () => {};

  return (
    <div className="flex flex-col w-[37%] max-md:ms-0 max-md:w-full">
      <div className="flex flex-col grow items-center justify-between py-10 mx-auto w-full bg-primary-100 h-[460px]">
        <div className="flex flex-col self-stretch px-6 text-3xl tracking-tight leading-10 text-neutral-50 max-md:pl-5">
          <h1>{t("subscribe_text")}</h1>
        </div>
        <div className="ms-auto">
          <Logo />
        </div>

        {/* <div>
          <div className="flex gap-5 justify-between items-center pr-1 mt-28 w-72 max-w-full text-sm leading-5 text-gray-200 whitespace-nowrap max-md:mt-10">
            <EsraInput
              type="email"
              placeholder="your@email.ru"
              value={email}
              className="border-none placeholder:text-white !outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={onSubscribe}>
              <RightArrow />
            </button>
          </div>
          <div className="shrink-0 h-[1px] w-72 max-w-full bg-zinc-400" />
        </div> */}
      </div>
    </div>
  );
}
