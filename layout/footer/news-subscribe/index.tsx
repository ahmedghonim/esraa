"use client";
import Logo from "@/svg/logo.svg";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {};

export default function NewsSubscribe({}: Props) {
  const t = useTranslations("common");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col w-full md:w-[37%]">
      <div className="flex flex-col grow items-center justify-between py-6 md:py-10 mx-auto w-full bg-primary-100 h-auto md:h-[460px]">
        <div className="ms-auto scale-90 md:scale-100">
          <Logo />
        </div>
      </div>
    </div>
  );
}
