"use client";

import { EsraLink } from "@/components/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BrandStory() {
  const t = useTranslations("common");

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-primary-100 mb-4">
            {t("our_story")}
          </h2>

          <p className="text-lg text-gray-700 mb-6">{t("brand_story_p1")}</p>

          <p className="text-lg text-gray-700 mb-8">{t("brand_story_p2")}</p>

          <EsraLink
            name={t("learn_more")}
            href="/about-us"
            className="w-auto px-6 inline-block"
          />
        </div>

        <div className="order-1 md:order-2 relative h-[400px]">
          <Image
            src="/brand-story.jpg"
            alt={t("brand_story_image_alt")}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
