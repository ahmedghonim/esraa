import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import clsx from "clsx";

interface Props {
  pagesCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function EsraPagination({ pagesCount, page, setPage }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        {/* back */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setPage(page - 1)}
            className="cursor-pointer"
          />
        </PaginationItem>

        {/* pages */}
        {[...Array(pagesCount)].map((_page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setPage(index + 1)}
              className={clsx("cursor-pointer text-primary-150 font-Messiri", {
                "underline text-primary-100 font-bold": page === index + 1,
              })}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {/* next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page + 1 <= pagesCount && setPage(page + 1)}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
