"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { BookBorrowParams } from "@/types";
import { revalidatePath } from "next/cache";

export const borrowBook = async (params: BookBorrowParams) => {
  const { userId, bookId, dueDate } = params;

  try {
    const [book] = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book || book.availableCopies <= 0)
      return {
        success: false,
        message: "Sorry, this book is currently unavailable.",
      };

    const [existingBorrow] = await db
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

    if (existingBorrow)
      return {
        success: false,
        message: "You have already borrowed this book.",
      };

    await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(books.id, bookId));

    revalidatePath("/books/:id");

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
