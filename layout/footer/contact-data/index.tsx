import { getOurInfo } from "@/actions/our-info";
import ArrowUp from "@/svg/arrow-top.svg";
import { Link } from "@/utils/navigation";
import { OurInfo } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

type Props = {};

export default function ContactData({}: Props) {
  const t = useTranslations("common");
  const [info, setInfo] = React.useState<OurInfo>();
  useEffect(() => {
    getOurInfo().then((data) => {
      setInfo(data as OurInfo);
    });
  }, []);

  return (
    <div className="flex gap-5 justify-between items-start mt-8 md:mt-12 w-full max-w-[1044px] max-md:flex-col-reverse px-4 max-lg:px-6">
      <div className="flex justify-center items-center px-6 md:px-8 mt-2.5 border border-solid bg-primary-100 border-zinc-600 h-[72px] md:h-[88px] w-[72px] md:w-[88px]">
        <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
      <div className="flex gap-5 justify-between items-start px-0 md:px-5 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col self-stretch text-sm leading-5 text-neutral-600">
          <h1 className="text-xl md:text-2xl text-zinc-800">
            {t("phone_number")}
          </h1>
          <Link href={`tel:${info?.phone}`} className="mt-2">
            {info?.phone}
          </Link>
        </div>
        <div className="flex flex-col text-sm leading-5 whitespace-nowrap text-neutral-600">
          <h1 className="text-xl md:text-2xl text-zinc-800">{t("email")}</h1>
          <Link href={`mailto:${info?.email}`} className="mt-2">
            {info?.email}
          </Link>
        </div>
        {/* <div className="flex flex-col">
          <h1 className="text-2xl leading-8 text-zinc-800">Address</h1>
          <address className="mt-2 text-sm leading-5 text-neutral-600">
            33426 Fiona Ports, Feeneyport 63186-7530
          </address>
        </div> */}
      </div>
    </div>
  );
}
