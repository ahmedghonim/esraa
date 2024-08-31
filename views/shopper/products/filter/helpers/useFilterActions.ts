import { Color, Product, Size } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface TFilterState {
  category: number | null;
  min_price: number;
  max_price: number;
  color: number[] | [];
  size: number[] | [];
}

export const initialFiterState = {
  category: null,
  min_price: 500,
  max_price: 1500,
  color: [],
  size: [],
};

const useFilterActions = (
  data: Array<
    Product & { sizes: Size[] } & { colors: Color[] } & {
      price: number;
      category: { id: number };
    }
  >
) => {
  const param = useSearchParams();
  const categories = param.get("categories");

  const [filterControler, setFilterControler] = useState(initialFiterState);

  const [products, setProducts] = useState<
    Array<
      Product & { sizes: Size[] } & { colors: Color[] } & {
        price: number;
        category: { id: number };
      }
    >
  >(data);

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (searchValue !== "") {
      setProducts(data.filter((product) => product.name.includes(searchValue)));
    } else setProducts(data);
    if (categories) {
      setProducts(
        // @ts-ignore
        data.filter((product) =>
          // @ts-ignore
          product.categories.some(
            // @ts-ignore
            (category) => category.id === Number(categories)
          )
        )
      );
    }
  }, [searchValue, categories]);

  /* ------------------------ */
  /*      On Apply Filter     */
  /* ------------------------ */

  const onApplyFilter = () => {
    const filteredProducts = data.filter((product) => {
      return (
        (filterControler.category
          ? // @ts-ignore
            product?.categories?.some(
              (category: any) => category.id === filterControler.category
            )
          : true) &&
        // min price check
        product.price >= filterControler.min_price &&
        // max price check
        product.price <= filterControler.max_price &&
        // // size check
        (filterControler.size.length > 0
          ? product.sizes.some((size) =>
              filterControler.size.includes(size.id as never)
            )
          : true) &&
        // // color check
        (filterControler.color.length > 0
          ? product.colors.some((color) =>
              filterControler.color.includes(color.id as never)
            )
          : true)
      );
    });

    setProducts(filteredProducts);
  };

  /* ------------------------ */
  /*      On Apply Filter     */
  /* ------------------------ */
  const onResetFilter = () => {
    setFilterControler(initialFiterState);
    setProducts(data);
  };

  return {
    filterControler,
    products,
    onResetFilter,
    setSearchValue,
    setFilterControler,
    onApplyFilter,
  };
};

export { useFilterActions };
