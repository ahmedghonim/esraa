import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  title: string;
  href: string;
}

function EsraSectionTitle({ title, href }: Props) {
  const t = useTranslations("common");
  return (
    <div className="flex justify-between  tracking-tight max-md:flex-wrap max-md:max-w-full">
      <div className="flex flex-col pt-2.5 text-3xl text-zinc-800">
        <h1 className="text-primary-500">{title}</h1>
        <div className="shrink-0 mix-blend-multiply bg-primary-100 h-[19px] w-[114px]" />
      </div>
      <Link
        href={href}
        className="my-auto text-base underline text-primary-100"
      >
        {t("view_all")}
      </Link>
    </div>
  );
}
export default EsraSectionTitle;
