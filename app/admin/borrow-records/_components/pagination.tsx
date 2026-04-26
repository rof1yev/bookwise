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
  sort: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
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
    <PaginationUI className="flex justify-center sm:justify-end" role="div">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            href={isFirstPage ? "#" : `?sort=${sort}&page=${currentPage - 1}`}
            className={cn(
              "!bg-white border-primary-admin border !text-primary-admin hover:!text-white hover:!bg-primary-admin",
              isFirstPage && "pointer-events-none opacity-50 !bg-white/90",
            )}
          />
        </PaginationItem>

        {pages.map((p, i: number) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis className="!bg-white border-primary-admin !text-primary-admin" />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={`?sort=${sort}&page=${p}`}
                isActive={p === currentPage}
                className={cn(
                  "!bg-white !border-primary-admin hover:!bg-primary-admin !text-primary-admin hover:!text-white",
                  p === currentPage
                    ? "!bg-primary-admin !text-white hover:!text-white"
                    : "hover:bg-gray-100",
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            href={isLastPage ? "#" : `?sort=${sort}&page=${currentPage + 1}`}
            className={cn(
              "!bg-white border-primary-admin border !text-primary-admin hover:!text-white hover:!bg-primary-admin",
              isLastPage && "pointer-events-none opacity-50 !bg-white/90",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
