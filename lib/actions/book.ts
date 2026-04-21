"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BookBorrowParams) => {
  const { userId, bookId } = params;

  try {
    await db.transaction(async (tx) => {
      const [book] = await tx
        .select({ availableCopies: books.availableCopies })
        .from(books)
        .where(eq(books.id, bookId))
        .limit(1);

      if (!book || book.availableCopies <= 0) {
        throw new Error("Book unavailable");
      }

      const [existingBorrow] = await tx
        .select()
        .from(borrowRecords)
        .where(
          and(
            eq(borrowRecords.userId, userId),
            eq(borrowRecords.bookId, bookId),
            eq(borrowRecords.status, "BORROWED"),
          ),
        )
        .limit(1);

      if (existingBorrow) {
        throw new Error("Already borrowed");
      }

      const dueDate = dayjs().add(7, "day").toDate().toDateString();

      await tx.insert(borrowRecords).values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      });

      await tx
        .update(books)
        .set({ availableCopies: book.availableCopies - 1 })
        .where(eq(books.id, bookId));
    });

    return {
      success: true,
      message: "Book borrowed successfully!",
    };
  } catch (error) {
    console.error("Error borrowing book:", error);
    return {
      success: false,
      message: "Failed to borrow the book. Please try again.",
    };
  }
};
