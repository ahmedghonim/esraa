import { Color, Product, Size } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface TFilterState {
  min_price: number;
  max_price: number;
  color: number[] | [];
  size: number[] | [];
  categories: any;
  sale?: boolean;
}

export const initialFiterState = {
  category: null,
  min_price: 0,
  max_price: 5000,
  color: [],
  size: [],
  sale: false,
};

const useFilterActions = (data: any, initialFilters?: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categories = searchParams.get("categories");
  const newarrival = searchParams.get("newarrival");
  const sale = searchParams.get("sale");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");

  // Initialize filter state with values from URL or defaults
  const [filterControler, setFilterControler] = useState({
    ...initialFiterState,
    category: categories ? parseInt(categories) : null,
    min_price: min_price ? parseInt(min_price) : initialFiterState.min_price,
    max_price: max_price ? parseInt(max_price) : initialFiterState.max_price,
    sale: sale === "true",
  });

  const [products, setProducts] = useState<
    Array<
      Product & { sizes: Size[] } & { colors: Color[] } & {
        price: number;
        category: { id: number };
      }
    >
  >(data);

  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize filters from URL if present
  useEffect(() => {
    if (initialFilters) {
      setFilterControler((prev) => ({
        ...prev,
        category: initialFilters.categories || prev.category,
        sale: initialFilters.sale || prev.sale,
        min_price: initialFilters.minPrice || prev.min_price,
        max_price: initialFilters.maxPrice || prev.max_price,
      }));
    }
  }, [initialFilters]);

  // Apply search filter client-side (could be moved to server later)
  useEffect(() => {
    if (searchValue !== "") {
      const filteredProducts = data.filter((product: any) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(data);
    }
  }, [searchValue, data]);

  /* ------------------------ */
  /*      On Apply Filter     */
  /* ------------------------ */
  const onApplyFilter = () => {
    // Set loading state
    setIsLoading(true);

    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when applying new filters
    params.set("page", "1");

    // Add/update parameters based on filter state
    if (filterControler.category) {
      params.set("categories", filterControler.category.toString());
    } else {
      params.delete("categories");
    }

    if (filterControler.sale) {
      params.set("sale", "true");
    } else {
      params.delete("sale");
    }

    params.set("min_price", filterControler.min_price.toString());
    params.set("max_price", filterControler.max_price.toString());

    // Handle color and size filters (these could be comma-separated lists)
    if (filterControler.color.length > 0) {
      params.set("colors", filterControler.color.join(","));
    } else {
      params.delete("colors");
    }

    if (filterControler.size.length > 0) {
      params.set("sizes", filterControler.size.join(","));
    } else {
      params.delete("sizes");
    }

    // Navigate to the new URL with filters
    router.push(`${pathname}?${params.toString()}`);
  };

  /* ------------------------ */
  /*      On Reset Filter     */
  /* ------------------------ */
  const onResetFilter = () => {
    setIsLoading(true);
    setFilterControler(initialFiterState);
    // Reset URL parameters and navigate
    router.push(pathname);
  };

  // Reset loading state when URL changes (navigation completes)
  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return {
    filterControler,
    products,
    onResetFilter,
    setSearchValue,
    setFilterControler,
    onApplyFilter,
    isLoading,
  };
};

export { useFilterActions };
