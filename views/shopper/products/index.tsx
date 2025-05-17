"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category, Collection, Color, Product, Size } from "@prisma/client";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "use-intl";
import Filter from "./filter";
import { useFilterActions } from "./filter/helpers/useFilterActions";
import ProductsList from "./products-list";

interface Props {
  color: Color[];
  category: Category[];
  sizes: Size[];
  collection: Collection[];
  data: Array<
    Product & { sizes: Size[] } & { colors: Color[] } & {
      price: number;
      category: { id: number };
    }
  >;
  initialFilters?: {
    categories?: number;
    sale?: boolean;
    newarrival?: boolean;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
  };
  pagination?: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}

export default function Products({
  color,
  category,
  sizes,
  collection,
  data,
  initialFilters,
  pagination,
}: Props) {
  const t = useTranslations("common");
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    filterControler,
    onResetFilter,
    setFilterControler,
    onApplyFilter,
    isLoading,
  } = useFilterActions(data, initialFilters);

  return (
    <section className="container mx-auto px-4 mt-[100px]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <FilterIcon className="h-4 w-4" />
                {t("filters")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>{t("filters")}</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <Filter
                  color={color}
                  category={category}
                  collection={collection}
                  sizes={sizes}
                  filterControler={filterControler}
                  onResetFilter={onResetFilter}
                  setFilterControler={setFilterControler as any}
                  onApplyFilter={() => {
                    onApplyFilter();
                    setOpenDrawer(false);
                  }}
                  isLoading={isLoading}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filter */}
        <aside className="hidden lg:block w-full max-w-[300px] flex-shrink-0">
          <Filter
            color={color}
            category={category}
            collection={collection}
            sizes={sizes}
            filterControler={filterControler}
            onResetFilter={onResetFilter}
            setFilterControler={setFilterControler as any}
            onApplyFilter={onApplyFilter}
            isLoading={isLoading}
          />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <ProductsList data={data} pagination={pagination} />
        </main>
      </div>
    </section>
  );
}
