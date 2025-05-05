"use client";

import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import { useDebounce } from "@/hooks/useDebounce";
import { Category, Product } from "@/schema";
import { usePathname, useRouter } from "@/utils/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SearchProps {
  className?: string;
  placeholder?: string;
}

export function Search({ className = "", placeholder }: SearchProps) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        const categoriesData = await getAllCategories({});
        setProducts(productsData as any);
        setCategories(categoriesData as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter results based on search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();

      // Filter products
      const matchedProducts = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        )
        .slice(0, 5); // Limit to 5 results

      // Filter categories
      const matchedCategories = categories
        .filter((category) => category.name.toLowerCase().includes(term))
        .slice(0, 3); // Limit to 3 results

      setFilteredProducts(matchedProducts);
      setFilteredCategories(matchedCategories);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setFilteredCategories([]);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm, products, categories]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  const handleProductClick = (productId: number | undefined) => {
    if (productId !== undefined) {
      router.push(`/products/${productId}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleCategoryClick = (categoryId: number | undefined) => {
    if (categoryId !== undefined) {
      router.push(`/products?categories=${categoryId}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder || t("search_products")}
          className="w-full py-2 pl-10 pr-10 border border-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-100"
          aria-label={t("search")}
        >
          <SearchIcon size={18} />
        </button>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-100 hover:text-primary-200"
            aria-label={t("clear_search")}
          >
            <X size={18} />
          </button>
        )}
      </form>

      {/* Autocomplete dropdown */}
      {isOpen &&
        searchTerm.length > 0 &&
        (filteredProducts.length > 0 || filteredCategories.length > 0) && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
            {filteredCategories.length > 0 && (
              <div className="p-2 border-b">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  {t("categories")}
                </h3>
                <ul>
                  {filteredCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  {t("products")}
                </h3>
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <button
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.thumbnail && (
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover mr-3"
                          />
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.price} {t("LE")}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-2 border-t">
              <button
                className="w-full text-center py-2 text-primary-100 hover:underline"
                onClick={handleSearchSubmit}
              >
                {t("view_all_results")}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
