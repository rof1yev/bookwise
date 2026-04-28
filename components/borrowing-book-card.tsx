"use client";

import Image from "next/image";
import BookCover from "./book-cover";
import dayjs from "dayjs";
import { Book, BorrowRecords } from "@/types";
import { hexToRgba } from "@/lib/utils";

export const BorrowingBookCard = ({
  book,
  borrow_record,
}: {
  book: Book;
  borrow_record: BorrowRecords;
  isLoanedBook?: boolean;
}) => {
  const daysLeft = dayjs(borrow_record.dueDate).diff(dayjs(), "day");

  const now = dayjs();
  const dueDate = dayjs(borrow_record.dueDate);
  const returnDate = borrow_record.returnDate
    ? dayjs(borrow_record.returnDate)
    : null;

  const referenceDate = returnDate || now;
  const daysDiff = dueDate.diff(referenceDate, "day");

  const getStatusText = () => {
    if (returnDate) {
      return daysDiff >= 0
        ? `Returned on time (${daysDiff} days early)`
        : `Returned ${Math.abs(daysDiff)} days late`;
    }

    if (daysDiff > 0) return `${daysDiff} days left to due`;
    if (daysDiff === 0) return "Due today";
    return `${Math.abs(daysDiff)} days overdue`;
  };

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

        <div className="min-h-50 flex flex-col justify-between">
          <div className="mt-4 w-full">
            <p className="text-white text-xl font-semibold mb-2">
              {book.title}
            </p>
            <p className="text-light-100 italic text-base">{book.genre}</p>
          </div>

          <div className="flex flex-col justify-end mt-5">
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
              {borrow_record.returnDate ? (
                <>
                  <Image
                    src="/images/check.png"
                    alt="book icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-light-100">{getStatusText()}</span>
                </>
              ) : (
                <>
                  {" "}
                  <Image
                    src="/icons/calendar.svg"
                    alt="book icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-light-100">
                    {" "}
                    {daysLeft > 0
                      ? `${daysLeft} days left to due`
                      : daysLeft === 0
                        ? "Due today"
                        : `${Math.abs(daysLeft)} days overdue`}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
