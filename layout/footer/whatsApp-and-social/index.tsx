import React, { useEffect } from "react";
import TopRight from "@/svg/arrow-top-right.svg";
import Whatsapp from "@/svg/footer-whatsapp.svg";
import { SocialMedia } from "@/components/ui";
import { Link } from "@/utils/navigation";
import { getOurInfo } from "@/actions/our-info";
import { OurInfo } from "@/schema";
import { useTranslations } from "next-intl";

type Props = {};

export default function WhatsAppAndSocialMedia({}: Props) {
  const t = useTranslations("common");

  const [info, setInfo] = React.useState<any>();
  useEffect(() => {
    getOurInfo().then((data) => {
      setInfo(data as OurInfo);
    });
  }, []);
  return (
    <>
      <div className="flex gap-5 justify-between px-5 max-md:flex-wrap max-md:max-w-full max-lg:mt-8">
        <span className="max-lg:hidden self-end mt-40 text-2xl leading-8 text-zinc-800 max-md:mt-10">
          {t("our_info")}
        </span>
        <div className="flex flex-col">
          <div className="px-5 py-4 max-w-full text-sm leading-5 whitespace-nowrap bg-primary-100 text-neutral-50 w-[243px]">
            <Whatsapp />
            <Link
              href={info?.whatsApp || "/"}
              target="_blank"
              className="flex gap-2 justify-end mt-7"
            >
              <span>Whatsapp</span>
              <TopRight />
            </Link>
          </div>
          <div className="flex gap-5 md:mt-12 w-full max-md:mt-10">
            <span className="max-lg:hidden flex-auto text-2xl leading-8 text-zinc-800">
              {t("categories")}
            </span>
            <div className="flex flex-1 gap-4">
              <SocialMedia fill="primary" info={info} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-md:hidden mt-1.5 border border-solid bg-zinc-400 border-zinc-400 max-md:max-w-full" />
    </>
  );
}
