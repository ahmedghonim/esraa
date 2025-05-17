import { getAllCategories } from "@/actions/category";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
        <div className="flex flex-col w-[43%] max-md:ms-0 max-md:w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="our-info">
              <AccordionTrigger className="text-2xl leading-8 text-zinc-800">
                {t("our_info")}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-6 text-lg leading-6 text-zinc-800">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col ms-5 w-[45%] max-md:ms-0 max-md:w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-2xl leading-8 text-zinc-800">
                {t("categories")}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-3">
                  {category?.map((category) => (
                    <Link
                      key={category.id}
                      className="shadow-md rounded-md px-2 py-1 text-lg hover:bg-zinc-100 transition-colors"
                      href={`/products?categories=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
