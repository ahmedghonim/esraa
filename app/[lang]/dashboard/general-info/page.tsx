import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import React from "react";
import SizeForm from "@/views/forms/general-form/size-form";
import CollectionForm from "@/views/forms/general-form/collection-form";
import ColorForm from "@/views/forms/general-form/color-form";

import { getAllColors } from "@/actions/color";
import { getAllCategories } from "@/actions/category";
import { getAllCollections } from "@/actions/collection";
import { getAllSizes } from "@/actions/size";
import CategoriesForm from "@/views/forms/general-form/categories-form";
import { Link } from "@/utils/navigation";

async function GeneralInfo({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = await getTranslations("common");
  const tab = searchParams.tab as string | undefined;
  const tabs = ["color", "size", "collection", "category"];
  const color = await getAllColors();
  const category = await getAllCategories();
  const collection = await getAllCollections();
  const sizes = await getAllSizes();
  return (
    <div>
      <div className="flex gap-3 p-8">
        {tabs.map((item) => (
          <Link
            className={cn(
              "hover:bg-primary-100 hover:text-white duration-200 p-2 px-3 rounded text-primary-100 text-sm font-semibold",
              {
                "!bg-primary-100 text-white": item === tab && tab !== undefined,
              },
              {
                "bg-primary-100  text-white":
                  item === "color" && tab === undefined,
              }
            )}
            key={item}
            href={`/dashboard/general-info?tab=${item}`}
          >
            {t(item)}
          </Link>
        ))}
      </div>
      <div>
        {(tab === "color" || tab === undefined) && <ColorForm colors={color} />}
        {tab === "size" && <SizeForm sizes={sizes} />}
        {tab === "category" && <CategoriesForm category={category} />}
        {tab === "collection" && <CollectionForm collection={collection} />}
      </div>
    </div>
  );
}

export default GeneralInfo;
