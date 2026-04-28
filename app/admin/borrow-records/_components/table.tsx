"use client";

import BookCover from "@/components/book-cover";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, BorrowRecords, User } from "@/types";
import { format } from "date-fns";
import { QrCodeIcon } from "lucide-react";
import Pagination from "./pagination";
import Avatar from "@/components/avatar";
import BorrowStatus from "./borrow-status";
import { cn } from "@/lib/utils";

const Table = ({
  data,
  tableClassName,
  sort,
  totalCount,
  pageSize,
  currentPage,
}: {
  data: {
    book: Book | null;
    borrow: BorrowRecords;
    user: User | null;
  }[];
  tableClassName?: string;
  sort: string;
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  return (
    <div>
      <TableUI className={tableClassName}>
        <TableHeader className="bg-[#F8F8FF] h-12">
          <TableRow>
            <TableHead className="font-normal text-sm w-56">Book</TableHead>
            <TableHead className="font-normal text-sm w-56">
              User Requested
            </TableHead>
            <TableHead className="font-normal text-sm">Status</TableHead>
            <TableHead className="font-normal text-sm">Borrowed Date</TableHead>
            <TableHead className="font-normal text-sm">Return Date</TableHead>
            <TableHead className="font-normal text-sm">Due Date</TableHead>
            <TableHead className="text-right font-normal text-sm">
              Receipt
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium">
          {data.length > 0 ? (
            <>
              {data.map(({ book, borrow, user }) => {
                const dueDate = new Date(borrow.createdAt!);
                dueDate.setDate(dueDate.getDate() + 7);

                return (
                  <TableRow
                    key={borrow.id}
                    className={cn(
                      "h-16",
                      borrow.status === "RETURNED" &&
                        "bg-green-100/30 hover:bg-green-100/50",
                      borrow.status === "BORROWED" &&
                        "bg-sky-100/30 hover:bg-sky-100/50",
                    )}
                  >
                    <TableCell className="w-56">
                      <div className="flex items-center gap-2 text-wrap truncate">
                        <BookCover
                          variant="extraSmall"
                          coverImage={book?.coverUrl as string}
                          coverColor={book?.coverColor as string}
                        />
                        <p className="line-clamp-2">{book?.title}</p>
                      </div>
                    </TableCell>
                    <TableCell className="w-56">
                      <div className="flex gap-1.5 items-center">
                        <Avatar
                          src=""
                          fallback={user?.fullName as string}
                          className="size-10"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-dark-400 font-semibold text-sm">
                            {user?.fullName}
                          </h4>
                          <p className="text-[#64748B] font-normal text-sm">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <BorrowStatus
                        status={borrow.status!}
                        borrowId={borrow.id}
                      />
                    </TableCell>
                    <TableCell>
                      {format(borrow.createdAt!, "dd MMM, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(borrow.dueDate, "dd MMM, yyyy")}
                    </TableCell>
                    <TableCell>{format(dueDate, "dd MMM, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <QrCodeIcon className="ml-auto" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-gray-500"
              >
                No borrow requests yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableUI>
      {totalCount > pageSize && (
        <Pagination
          sort={sort}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Table;
