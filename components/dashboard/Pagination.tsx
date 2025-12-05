// components/dashboard/Pagination.tsx - Updated
"use client";
import { usePaginationStore } from "@/store/pagination.store";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages?: number;
}

const Pagination = ({ totalPages = 500 }: PaginationProps) => {
  const { pageNum, setPageNum } = usePaginationStore();

  const maxPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (maxPages <= maxVisible) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (pageNum > 3) {
      pages.push("...");
    }

    const start = Math.max(2, pageNum - 1);
    const end = Math.min(maxPages - 1, pageNum + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (pageNum < maxPages - 2) {
      pages.push("...");
    }

    if (maxPages > 1) {
      pages.push(maxPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center w-full mt-8 gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPageNum(pageNum - 1)}
        disabled={pageNum === 1}
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1 flex-wrap justify-center max-w-xl">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          return (
            <Button
              key={pageNumber}
              variant={pageNum === pageNumber ? "default" : "outline"}
              onClick={() => setPageNum(pageNumber)}
              className="h-9 w-9 p-0"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setPageNum(pageNum + 1)}
        disabled={pageNum === maxPages}
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="hidden md:block ml-4 text-sm text-muted-foreground">
        Page {pageNum} of {maxPages}
      </div>
    </div>
  );
};

export default Pagination;
