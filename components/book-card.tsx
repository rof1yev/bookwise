"use client";

import Link from "next/link";
import BookCover from "./book-cover";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className="xs:w-52 w-full">
      <Link href={`/books/${id}`} className="w-full flex flex-col items-center">
        <BookCover
          coverColor={coverColor}
          coverImage={coverUrl}
          className="full"
        />

        <div className="mt-4 w-full text-center">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>

            <Button className="bg-dark-600 mt-3 min-h-14 w-full text-base text-primary">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
