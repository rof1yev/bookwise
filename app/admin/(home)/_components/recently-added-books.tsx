import BookCover from "@/components/book-cover";
import { Book } from "@/types";
import { format } from "date-fns";
import { CalendarDaysIcon, DotIcon } from "lucide-react";

const RecentlyAddedBooks = ({ allBooks }: { allBooks: { book: Book }[] }) => {
  return (
    <>
      {allBooks.map(({ book }) => (
        <div
          key={book.id}
          className="rounded-[10px] p-3.5 flex gap-3.5 hover:opacity-80"
        >
          <BookCover
            variant="small"
            className=""
            coverColor={book.coverColor}
            coverImage={book.coverUrl}
          />
          <div className="flex flex-col gap-1">
            <div className="">
              <h4 className="font-semibold text-dark-400">{book.title}</h4>
              <div className="flex font-normal text-[#64748B] text-sm">
                <p>By {book.author}</p>
                <DotIcon />
                <p>{book.genre}</p>
              </div>
            </div>

            <p className="flex items-center text-xs text-[#3A354E]">
              <CalendarDaysIcon size={12} className="mr-0.5" />{" "}
              {format(book.createdAt!, "dd MMM, yyyy")}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecentlyAddedBooks;
