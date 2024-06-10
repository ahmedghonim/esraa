import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";

import React from "react";

type Props = {};

const currentYear = new Date().getFullYear();

export default function FooterBar({}: Props) {
  const t = useTranslations("common");

  return (
    <div className="flex justify-center items-center self-stretch px-16 py-5 mt-12 w-full text-sm leading-5 bg-primary-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-w-[1044px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 self-start mt-2 text-neutral-50">
          <div className="flex-auto">
            © {currentYear} — {t("copy_right")}
          </div>
          <div className="flex gap-4">
            <Link href="" className="underline">
              {t("privacy")}
            </Link>
            <Link href="" className="underline">
              {t("terms_and_condition")}
            </Link>
          </div>
        </div>
        <div className="flex gap-5 justify-between font-medium tracking-wide uppercase whitespace-nowrap">
          <button className="text-neutral-50">{t("en")}</button>
          <button className="text-neutral-400">{t("ar")}</button>
        </div>
      </div>
    </div>
  );
}
