"use client";

import Image from "next/image";
import BookCover from "./book-cover";
import dayjs from "dayjs";
import { Book, BorrowRecords } from "@/types";

function hexToRgba(hex: string, opacity: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const BorrowingBookCard = ({
  book,
  borrow_record,
}: {
  book: Book;
  borrow_record: BorrowRecords;
  isLoanedBook?: boolean;
}) => {
  const daysLeft = dayjs(borrow_record.dueDate).diff(dayjs(), "day");

  return (
    <li className="gradient-dark-blue p-4 rounded-md">
      <div className="flex flex-col">
        <div
          style={{ backgroundColor: hexToRgba(book.coverColor, 0.3) }}
          className="flex justify-center items-center w-full p-8"
        >
          <BookCover
            coverColor={book.coverColor}
            coverImage={book.coverUrl}
            className="full"
            variant="medium"
          />
        </div>

        <div className="">
          <div className="mt-4 w-full">
            <p className="text-white text-xl font-semibold">{book.title}</p>
            <p className="text-light-100 italic text-base">{book.genre}</p>
          </div>

          <div className="flex flex-col justify-end mt-5 bg-rose-500">
            <p className="flex items-center gap-2">
              <Image
                src="/icons/admin/book.svg"
                alt="book icon"
                width={16}
                height={16}
              />
              <span className="text-light-100">
                Borrowed on {dayjs(borrow_record.createdAt!).format("MMMM DD")}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Image
                src="/icons/calendar.svg"
                alt="book icon"
                width={16}
                height={16}
              />
              <span className="text-light-100">
                {" "}
                {daysLeft > 0
                  ? `${daysLeft} days left`
                  : daysLeft === 0
                    ? "Due today"
                    : `${Math.abs(daysLeft)} days overdue`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
