import { getAllCategories } from "@/actions/category";
import { Link } from "@/utils/navigation";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";

import React, { useEffect } from "react";

export default function FooterNav() {
  const t = useTranslations("common");
  const [category, setCategory] = React.useState<Category[]>();
  useEffect(() => {
    getAllCategories({}).then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <div className="px-5 mt-6 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
          <span className="lg:hidden text-2xl leading-8 text-zinc-800 mt-10">
            {t("our_info")}
          </span>
          <ul className="flex flex-col gap-6 grow text-lg leading-6 text-zinc-800 max-md:mt-4">
            <li>
              <Link href={"/"}>{t("home")}</Link>
            </li>
            <li>
              <Link href={"/products"}>{t("products")}</Link>
            </li>
            <li>
              <Link href={"/contact-us"}>{t("contact_us")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
          <span className="lg:hidden text-2xl leading-8 text-zinc-800 mt-10">
            {t("categories")}
          </span>
          <div className="flex flex-col gap-6 grow text-lg leading-6 text-zinc-800 max-md:mt-4">
            {category?.map((category) => (
              <Link
                key={category.id}
                href={`/products?categories=${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
