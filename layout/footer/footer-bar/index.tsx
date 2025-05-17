"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { Link, usePathname } from "@/utils/navigation";
import { useLocale, useTranslations } from "next-intl";

type Props = {};

const currentYear = new Date().getFullYear();

export default function FooterBar({}: Props) {
  const t = useTranslations("common");
  const { replace } = useRouter();

  const fullPath = usePathname();
  const lang = useLocale();

  const redirectedPathName = async (locale: any) => {
    const path = fullPath.replace(lang, "");

    replace("/" + locale + "/" + path);
  };
  return (
    <div className="flex justify-center items-center self-stretch px-16 py-5 mt-12 w-full text-sm leading-5 bg-primary-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-w-[1044px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 self-start mt-2 text-neutral-50">
          <div className="flex-auto">
            © {currentYear} — {t("copy_right")}
          </div>
          <div className="flex gap-4">
            <Link href="/terms-and-policy" className="underline">
              {t("terms_and_policy")}
            </Link>
          </div>
        </div>
        <div className="flex gap-5 justify-between font-medium tracking-wide uppercase whitespace-nowrap">
          <button
            className={cn("text-neutral-200 hover:text-neutral-50", {
              "text-neutral-50": lang === "en",
            })}
            onClick={() => redirectedPathName("en")}
            aria-label="Switch to English language"
          >
            {t("en")}
          </button>
          <button
            className={cn("text-neutral-200 hover:text-neutral-50", {
              "text-neutral-50": lang === "ar",
            })}
            onClick={() => redirectedPathName("ar")}
            aria-label="Switch to Arabic language"
          >
            {t("ar")}
          </button>
        </div>
      </div>
    </div>
  );
}
