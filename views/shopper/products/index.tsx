"use client";

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
    products,
    onResetFilter,
    setSearchValue,
    setFilterControler,
    onApplyFilter,
    isLoading,
  } = useFilterActions(data, initialFilters);

  return (
    <section className="mt-[100px] grid grid-cols-12 gap-5">
      <button onClick={() => setOpenDrawer(!openDrawer)} className="lg:hidden">
        <FilterIcon />
      </button>
      {openDrawer && (
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
      )}
      <div className="lg:col-span-3 col-span-12 flex flex-col gap-4 max-lg:hidden">
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
      </div>
      <ProductsList
        data={products}
        setSearchValue={setSearchValue}
        pagination={pagination}
      />
    </section>
  );
}
