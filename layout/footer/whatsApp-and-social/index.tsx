import { getOurInfo } from "@/actions/our-info";
import { SocialMedia } from "@/components/ui";
import TopRight from "@/svg/arrow-top-right.svg";
import Whatsapp from "@/svg/footer-whatsapp.svg";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

export default function WhatsAppAndSocialMedia() {
  const t = useTranslations("common");

  const [info, setInfo] = React.useState<any>();
  useEffect(() => {
    getOurInfo().then((data) => {
      setInfo(data as any);
    });
  }, []);
  return (
    <>
      <div className="flex gap-4 md:gap-5 justify-between px-0 md:px-5 max-md:flex-wrap max-md:max-w-full max-lg:mt-6">
        <span className="max-lg:hidden self-end mt-40 text-2xl leading-8 text-zinc-800">
          {t("our_info")}
        </span>
        <div className="flex flex-col w-full md:w-auto">
          <div className="px-4 md:px-5 py-4 max-w-full text-sm leading-5 whitespace-nowrap bg-primary-100 text-neutral-50 w-full md:w-[243px]">
            <Whatsapp />
            <Link
              href={"https://wa.me/" + info?.whatsApp || "/"}
              target="_blank"
              className="flex gap-2 justify-end mt-6 md:mt-7"
              aria-label="Contact us via WhatsApp"
            >
              <span>{t("whatsApp")}</span>
              <TopRight />
            </Link>
          </div>
          <div className="flex gap-4 md:gap-5 mt-8 md:mt-12 w-full">
            <span className="max-lg:hidden flex-auto text-2xl leading-8 text-zinc-800">
              {t("categories")}
            </span>
            <div className="flex flex-1 gap-4 justify-center md:justify-start">
              <SocialMedia fill="primary" info={info} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-md:hidden mt-1.5 border border-solid bg-zinc-400 border-zinc-400" />
    </>
  );
}
