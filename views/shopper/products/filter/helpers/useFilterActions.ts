import { Color, Product, Size } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface TFilterState {
  min_price: number;
  max_price: number;
  color: number[] | [];
  size: number[] | [];
  categories: any;
}

export const initialFiterState = {
  category: null,
  min_price: 500,
  max_price: 2000,
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
    let filteredProducts = data;

    if (searchValue !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (categories) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.categories.some((category: any) => category.id === categories)
      );
    }

    if (newarrival) {
      filteredProducts = filteredProducts.filter(
        (product) => product.newArrival
      );
    }

    setProducts(filteredProducts);
  }, [searchValue, categories, newarrival, data]);

  const onApplyFilter = () => {
    let filteredProducts = [...data]; // Start with all products
    // Filter by category
    if (filterControler.category) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.categories.some(
          (category: any) => category.id === filterControler.category
        )
      );
    }

    // Filter by price range
    if (filterControler.min_price || filterControler.max_price) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.newPrice || product.price; // Use newPrice if available
        return (
          price >= filterControler.min_price &&
          price <= filterControler.max_price
        );
      });
    }
    if (filterControler.size.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.ProductVariant.some((variant) => {
          const sizeMatch = filterControler.size.some(
            (filter) => filter === variant.size.name
          );

          return sizeMatch;
        })
      );
    }
    if (filterControler.color.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.ProductVariant.some((variant) => {
          const colorMatch = filterControler.color?.some(
            (filter) => filter === variant.colorId
          );

          return colorMatch;
        })
      );
    }
    // Set the filtered products (can be an empty array if no matches)
    setProducts(filteredProducts);
  };

  /* ------------------------ */
  /*      On Reset Filter     */
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
