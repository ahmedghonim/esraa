import { useTranslations } from "next-intl";
import React from "react";
import parser from "html-react-parser";
interface Props {
  description: string;
  // benifits: { image: string; name: string }[];
}

export default function ProductExtraInfo({ description }: Props) {
  const t = useTranslations("common");
  return (
    <div>
      <h1 className="mt-16 text-3xl font-medium text-zinc-800 max-md:mt-10 max-md:max-w-full">
        {t("product_description")}
      </h1>
      <div className="shrink-0 mix-blend-multiply bg-primary-100 h-[10px] w-[150px] mb-4" />

      <p className="text-lg leading-7 text-neutral-600 max-md:max-w-full">
        {parser(description)}
      </p>

      {/* <h1 className="mt-10 text-3xl font-medium text-zinc-800 max-md:max-w-full">
        Benefits
      </h1>
      <div className="shrink-0 mix-blend-multiply bg-primary-100 h-[19px] w-[78px]" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-3.5 text-lg text-neutral-700 max-md:flex-wrap">
        {benifits.map((benefit) => (
          <div className="flex gap-4 items-center" key={benefit.name}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/071aad7960dac56421b4fb1bbc406a79eb956293b95c86474a6dd0c9789e00bf?apiKey=f5af8c8bd07842f79a8521db5d6c1ca5&"
              className="shrink-0 w-11 aspect-square fill-zinc-600"
            />
            <span>{benefit.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
