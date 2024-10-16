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
  const newarrival = param.get("newarrival");

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

  /* ------------------------ */
  /*      On Apply Filter     */
  /* ------------------------ */
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
            (category) => category.name === categories
          )
        )
      );
    }
    if (newarrival) {
      setProducts(
        // @ts-ignore
        data.filter((product) => product.newArrival === true)
      );
    }
  }, [searchValue, categories, newarrival]);

  const onApplyFilter = () => {
    const filteredProducts = [];

    // filter by category
    if (filterControler.category) {
      // @ts-ignore
      filteredProducts.push(
        // @ts-ignore
        ...data
          .filter((product) =>
            // @ts-ignore
            product.categories.some(
              // @ts-ignore
              (category) => category.id === filterControler.category
            )
          )
          .filter((product) => {
            if (product.newPrice) {
              return (
                product.newPrice >= filterControler.min_price &&
                product.newPrice <= filterControler.max_price
              );
            } else {
              return (
                product.price >= filterControler.min_price &&
                product.price <= filterControler.max_price
              );
            }
          })
          .filter((product) => {
            // @ts-ignore
            return product.ProductVariant.some((variant: any) => {
              return (
                filterControler.size.includes(variant.size.name as never) &&
                filterControler.color.includes(variant.color.id as never)
              );
            });
          })
      );
    }

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
