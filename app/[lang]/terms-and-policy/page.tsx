"use client";
import { useTranslations } from "next-intl";

export default function TermsAndPolicy() {
  const t = useTranslations("common");

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-zinc-800 mb-8">
        {t("terms_and_policy")}
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t("try_before_buy")}
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            {t("try_before_buy_desc_1")}
          </p>
          <p className="text-zinc-600 leading-relaxed">
            {t("try_before_buy_desc_2")}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary-100">
            {t("special_offers")}
          </h2>
          <div className="bg-neutral-100 p-6 rounded-lg border-l-4 border-primary-100">
            <p className="text-zinc-700 font-medium">
              {t("special_offers_attention")}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t("important_notes")}
          </h2>
          <ul className="list-disc list-inside space-y-3 text-zinc-600">
            <li>{t("important_notes_sale")}</li>
            <li>{t("important_notes_condition")}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
