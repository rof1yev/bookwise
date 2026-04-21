"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import { BookOpenCheckIcon, Loader2Icon } from "lucide-react";

interface BorrowBookBtnProps {
  bookId: string;
  userId: string;
  borrowEligibility: {
    isEligible: boolean;
    message: string;
  };
  isLoanedBook: boolean;
}

const BorrowBookBtn = ({
  bookId,
  userId,
  borrowEligibility,
  isLoanedBook,
}: BorrowBookBtnProps) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState<boolean>(false);

  const handleBorrow = async () => {
    if (!borrowEligibility.isEligible)
      return toast.error("Error", {
        description: borrowEligibility.message,
      });

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Successfully", {
          description: "You have successfully borrowed the book.",
        });

        router.push("/my-profile");
      } else
        toast.error("Error", {
          description:
            result.message ||
            "An error occurred while trying to borrow the book. Please try again later.",
        });
    } catch (error) {
      console.error("Error borrowing book:", error);

      toast.error("Error", {
        description: "An error occurred while trying to borrow the book.",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <>
      {isLoanedBook ? (
        <Button
          className="book-overview_btn w-fit md:w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleBorrow}
          disabled={borrowing || !borrowEligibility.isEligible || isLoanedBook}
        >
          <BookOpenCheckIcon
            className="text-green-800"
            width={20}
            height={20}
          />
          <p className="font-bebas-neue text-xl text-dark-100">
            Already borrowed this Book
          </p>
        </Button>
      ) : (
        <Button
          className="book-overview_btn w-fit md:w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleBorrow}
          disabled={borrowing || !borrowEligibility.isEligible || isLoanedBook}
        >
          {borrowing ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Image src="/icons/book.svg" alt="Icon" width={20} height={20} />
          )}
          <p className="font-bebas-neue text-xl text-dark-100">Borrow Book</p>
        </Button>
      )}
    </>
  );
};

export default BorrowBookBtn;
