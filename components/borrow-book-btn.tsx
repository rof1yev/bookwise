"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import { BookOpenCheckIcon, Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addDays, format, differenceInDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

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
  const today = new Date();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 7),
  });

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) return setDateRange(range);

    if (range.to) {
      const diff = differenceInDays(range.to, range.from);

      if (diff > 6) {
        setDateRange({
          from: range.from,
          to: addDays(range.from, 6),
        });
        return;
      }
    }

    setDateRange(range);
  };

  const [borrowing, setBorrowing] = useState<boolean>(false);

  const handleBorrow = async () => {
    if (!borrowEligibility.isEligible)
      return toast.error("Error", {
        description: borrowEligibility.message,
      });

    if (!dateRange?.from || !dateRange?.to) {
      return toast.error("Error", {
        description: "Please select date range",
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({
        bookId,
        userId,
        dueDate: format(dateRange.to, "yyyy-MM-dd"),
      });

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
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                className="book-overview_btn w-fit md:w-full disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  borrowing || !borrowEligibility.isEligible || isLoanedBook
                }
              >
                {borrowing ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Image
                    src="/icons/book.svg"
                    alt="Icon"
                    width={20}
                    height={20}
                  />
                )}
                <p className="font-bebas-neue text-xl text-dark-100">
                  Borrow Book
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Borrow Book</DialogTitle>
                <DialogDescription>
                  Select the borrowing period for this book. Please choose a
                  return (due) date.
                </DialogDescription>
              </DialogHeader>
              <Card className="mx-auto w-fit p-0">
                <CardContent className="p-0">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    disabled={(date) => date < today}
                  />
                </CardContent>
              </Card>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={borrowing}
                    variant="outline"
                    className="disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={borrowing}
                  onClick={handleBorrow}
                  className="disabled:cursor-not-allowed disabled:opacity-55"
                >
                  Confirm Borrow
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default BorrowBookBtn;
