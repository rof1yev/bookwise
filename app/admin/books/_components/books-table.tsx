"use client";

import BookCover from "@/components/book-cover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book } from "@/types";
import { format } from "date-fns";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import Pagination from "./pagination";

const BooksTable = ({
  books,
  tableClassName,
  sort,
  totalCount,
  pageSize,
  currentPage,
}: {
  books: Book[];
  tableClassName?: string;
  sort: string;
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  return (
    <div>
      <>
        {books.length > 0 ? (
          <>
            <Table className={tableClassName}>
              <TableHeader className="bg-[#F8F8FF] h-12">
                <TableRow>
                  <TableHead className="font-normal text-sm w-96">
                    Title
                  </TableHead>
                  <TableHead className="font-normal text-sm">Author</TableHead>
                  <TableHead className="font-normal text-sm">Genre</TableHead>
                  <TableHead className="font-normal text-sm">
                    Created At
                  </TableHead>
                  <TableHead className="text-right font-normal text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-medium">
                {books.map((book: Book) => (
                  <TableRow key={book.id} className="h-16">
                    <TableCell className="w-96">
                      <div className="flex items-center gap-2 text-wrap">
                        <BookCover
                          variant="extraSmall"
                          coverImage={book.coverUrl}
                          coverColor={book.coverColor}
                        />
                        {book.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-wrap">{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>
                      {format(book.createdAt!, "dd MMM, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 items-center">
                        <Edit3Icon
                          size={18}
                          className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors hover:opacity-75"
                        />
                        <Trash2Icon
                          size={18}
                          className="text-red-600 cursor-pointer hover:text-red-700 transition-colors hover:opacity-75"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              sort={sort}
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </>
        ) : (
          <p>Not found any books</p>
        )}
      </>
    </div>
  );
};

export default BooksTable;
