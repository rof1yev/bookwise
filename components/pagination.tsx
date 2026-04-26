"use client";

import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  q: string;
  sort: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  q,
  sort,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage <= 2) pages.push(2, "ellipsis", totalPages);
    else if (currentPage >= totalPages - 1)
      pages.push("ellipsis", totalPages - 1, totalPages);
    else pages.push("ellipsis", currentPage, "ellipsis", totalPages);
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  return (
    <PaginationUI className="flex justify-center sm:justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            href={
              isFirstPage ? "#" : `?q=${q}&sort=${sort}&page=${currentPage - 1}`
            }
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {pages.map((p, i: number) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={`?q=${q}&sort=${sort}&page=${p}`}
                isActive={p === currentPage}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            href={
              isLastPage ? "#" : `?q=${q}&sort=${sort}&page=${currentPage + 1}`
            }
            className={cn(isLastPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
