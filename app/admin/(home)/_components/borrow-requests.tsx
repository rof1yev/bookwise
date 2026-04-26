import Avatar from "@/components/avatar";
import BookCover from "@/components/book-cover";
import { getInitials } from "@/lib/utils";
import { CalendarDaysIcon, DotIcon } from "lucide-react";
import { Book, BorrowRecords, User } from "@/types";
import NotFoundState from "./not-found-state";

interface BorrowRequestsProps {
  data: {
    user: User;
    borrow: BorrowRecords;
    book: Book;
  }[];
}

const BorrowRequests = ({ data }: BorrowRequestsProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 mt-3">
          {data.map(({ book, borrow, user }) => (
            <div
              key={book.id}
              className="bg-[#F8F8FF] rounded-[10px] p-3.5 flex gap-3.5 hover:opacity-80"
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
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <Avatar
                      className="size-5"
                      src=""
                      fallback={getInitials(user.fullName)}
                    />
                    <p className="font-normal text-xs text-[#3A354E]">
                      {user.fullName}
                    </p>
                  </div>
                  <p className="flex items-center text-xs text-[#3A354E]">
                    <CalendarDaysIcon size={12} className="mr-0.5" />{" "}
                    {borrow.dueDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFoundState
          src="/images/not-found-borrow.png"
          title="No Pending Book Requests"
          description=" There are no borrow book requests awaiting your review at this time."
        />
      )}
    </>
  );
};

export default BorrowRequests;
