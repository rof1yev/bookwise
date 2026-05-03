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
import { Edit3Icon } from "lucide-react";
import Pagination from "./pagination";
import BooksTableDeleteAction from "./table-actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div>
      <Table className={tableClassName}>
        <TableHeader className="bg-[#F8F8FF] h-12">
          <TableRow>
            <TableHead className="font-normal text-sm">Title</TableHead>
            <TableHead className="font-normal text-sm">Author</TableHead>
            <TableHead className="font-normal text-sm">Genre</TableHead>
            <TableHead className="font-normal text-sm">Created At</TableHead>
            <TableHead className="text-right font-normal text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium">
          {books.length > 0 ? (
            <>
              {books.map((book: Book) => (
                <TableRow key={book.id} className="h-16">
                  <TableCell className="w-96">
                    <div className="flex items-center gap-2 text-wrap">
                      <BookCover
                        variant="extraSmall"
                        coverImage={book.coverUrl}
                        coverColor={book.coverColor}
                        className="w-"
                      />
                      <p className="text-nowrap">{book.title}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-wrap">{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    {format(book.createdAt!, "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 items-center justify-end">
                      <Edit3Icon
                        onClick={() =>
                          router.push(`/admin/books/details/${book.id}`)
                        }
                        size={18}
                        className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors hover:opacity-75"
                      />
                      <BooksTableDeleteAction bookId={book.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-gray-500"
              >
                No any books found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <>
        {totalCount > pageSize && (
          <Pagination
            sort={sort}
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        )}
      </>
    </div>
  );
};

export default BooksTable;
