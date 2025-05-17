"use client";

import { EsraButton, EsraInput, ProductCard } from "@/components/ui";
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
import { ChevronUp, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  data: any;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  pagination?: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
};

export default function ProductsList({
  data,
  setSearchValue,
  pagination,
}: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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

  // Function to handle search
  const handleSearch = () => {
    setIsLoading(true);

    // Scroll to top of the page
    scrollToTop();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("search", searchTerm);
      // Reset to page 1 when searching
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Reset loading state when URL changes (navigation completes)
  React.useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  // Scroll to top on component mount or when pagination changes
  React.useEffect(() => {
    scrollToTop();
  }, [pagination?.page]);

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
        <EsraInput
          placeholder={t("search_placeholder")}
          startContent={<Search />}
          wrapperClassName="!flex-1"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearchValue(e.target.value);
          }}
          value={searchTerm}
        />

        <EsraButton
          name={isLoading ? "Loading..." : "Search"}
          className="text-white w-[150px] p-2"
          onClick={handleSearch}
          disabled={isLoading}
        />
      </div>

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
        {data.map((item: any) => (
          <ProductCard key={item.id} {...item} />
        ))}
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
