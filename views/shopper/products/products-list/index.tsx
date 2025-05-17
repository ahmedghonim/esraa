"use client";

import { EsraInput, ProductCard } from "@/components/ui";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Search from "@/svg/search.svg";
import { ChevronUp, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  data: any;

  pagination?: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
};

export default function ProductsList({ data, pagination }: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Handle search with debounce
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setIsLoading(true);

      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      // Reset to page 1 when searching
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 2000),
    [searchParams, router, pathname]
  );

  // Update search term when URL changes
  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    setSearchTerm(searchValue);
  }, [searchParams]);

  // Check scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setIsLoading(true);

    // Scroll to top of the page
    scrollToTop();

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Scroll to top on component mount or when pagination changes
  React.useEffect(() => {
    scrollToTop();
  }, [pagination?.page]);

  // Call debounced search when search term changes
  useEffect(() => {
    if (searchTerm !== (searchParams.get("search") || "")) {
      setIsTyping(true);
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch, searchParams]);

  // Reset loading state when URL changes (navigation completes)
  useEffect(() => {
    setIsLoading(false);
    setIsTyping(false);
  }, [searchParams]);

  // Typing indicator state
  const [isTyping, setIsTyping] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsTyping(true);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!pagination || pagination.pageCount <= 1) return null;

    const currentPage = pagination.page;
    const totalPages = pagination.pageCount;

    // Generate page numbers to display
    let pageNumbers = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show first page, last page, current page, and pages around current
      if (currentPage <= 3) {
        // Near the start
        pageNumbers = [1, 2, 3, 4, 5, null, totalPages];
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers = [
          1,
          null,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        // In the middle
        pageNumbers = [
          1,
          null,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          null,
          totalPages,
        ];
      }
    }

    return (
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === null ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => handlePageChange(pageNumber as number)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    );
  };

  return (
    <section className="lg:col-span-9 col-span-12 relative">
      {/* search */}
      <div className="flex justify-between items-center gap-2">
        <div className="relative flex-1">
          <EsraInput
            placeholder={t("search_placeholder")}
            startContent={<Search />}
            wrapperClassName="!flex-1"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Typing indicator */}
      {isTyping && searchTerm && (
        <div className="mt-2 text-sm text-primary-100">
          <span className="animate-pulse">{t("typing")}...</span>
        </div>
      )}

      {/* sort */}
      <div className="flex justify-between items-center my-6">
        <div className="text-lg">
          <span className="text-primary-300">{t("search_results:")}</span>{" "}
          <span className="font-bold text-primary-700">
            {pagination?.total || data?.length || 0}
          </span>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center my-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary-100" />
          <p className="mt-4 text-primary-100 font-medium animate-pulse">
            {t("loading")}...
          </p>
        </div>
      )}

      {/* products list */}
      <div
        className={`grid md:grid-cols-3 gap-5 mt-[14px] mb-8 ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {data.length === 0 ? (
          <div className="col-span-3 text-center py-10">
            <p className="text-lg text-gray-500">{t("no_products_found")}</p>
          </div>
        ) : (
          data.map((item: any) => <ProductCard key={item.id} {...item} />)
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pageCount > 1 && (
        <Pagination className="my-8">{generatePaginationItems()}</Pagination>
      )}

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary-100 p-3 rounded-full shadow-md hover:bg-primary-200 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6 text-white" />
        </button>
      )}
    </section>
  );
}
