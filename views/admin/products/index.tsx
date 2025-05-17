"use client";
import { EsraLink } from "@/components/ui";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import { Product } from "@prisma/client";
import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import ProductRow from "./product-row";

type PaginationInfo = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
};

type Props = {
  data: Product[];
  initialFilters?: {
    search?: string;
    page: number;
    pageSize: number;
  };
  pagination?: PaginationInfo;
};

export default function ProductsList({
  data,
  initialFilters,
  pagination,
}: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || "");

  const createQueryString = (
    params: Record<string, string | number | undefined>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });

    return newSearchParams.toString();
  };

  const onSearch = () => {
    startTransition(() => {
      router.push(
        `?${createQueryString({
          search: searchQuery,
          page: 1, // Reset to first page on new search
        })}`
      );
    });
  };

  const onPageChange = (page: number) => {
    startTransition(() => {
      router.push(
        `?${createQueryString({
          page,
        })}`
      );

      // Scroll to top on page change
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">
          {t("products_list:")}
        </h1>

        <EsraLink
          name="Add Product"
          className="text-white py-2 px-6 bg-primary-100 rounded-sm w-fit"
          href="/dashboard/products/add"
        />
      </div>

      {/* Search bar */}
      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            placeholder={t("search_products")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === "Enter" && onSearch()
            }
          />
        </div>
        <Button
          onClick={onSearch}
          disabled={isPending}
          className="bg-primary-100 text-white"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("search")
          )}
        </Button>
      </div>

      {/* Products table */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center w-[200px]">
              {t("product")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[70px]">
              {t("variant")}
            </TableHead>
            <TableHead className="!text-white text-center !max-w-[200px]">
              {t("description")}
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px]">
              {t("price")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px]">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length > 0 ? (
            data.map((product: any, index) => (
              <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
                <ProductRow {...product} />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={5} className="text-center py-8">
                {t("no_products_found")}
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {pagination.currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      onPageChange(pagination.currentPage - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: pagination.totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                // Show first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.totalPages ||
                  (pageNumber >= pagination.currentPage - 1 &&
                    pageNumber <= pagination.currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          onPageChange(pageNumber);
                        }}
                        isActive={pageNumber === pagination.currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis for gaps
                if (
                  (pageNumber === 2 && pagination.currentPage > 3) ||
                  (pageNumber === pagination.totalPages - 1 &&
                    pagination.currentPage < pagination.totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              {pagination.currentPage < pagination.totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      onPageChange(pagination.currentPage + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Results summary */}
      {pagination && (
        <div className="text-center text-sm text-gray-500 mt-2">
          {t("showing")}{" "}
          {pagination.currentPage > 1
            ? (pagination.currentPage - 1) * pagination.pageSize + 1
            : 1}
          -
          {Math.min(
            pagination.currentPage * pagination.pageSize,
            pagination.totalItems
          )}{" "}
          {t("of")} {pagination.totalItems} {t("products")}
        </div>
      )}
    </section>
  );
}
