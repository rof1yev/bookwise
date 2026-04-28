"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { BOOK_STATUS, BookParams } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: newBook[0],
      message: "Successfully created the book.",
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: "An error occurred while creating the book.",
    };
  }
};

export const updateBook = async (params: BookParams, bookId: string) => {
  try {
    const editBook = await db
      .update(books)
      .set(params)
      .where(eq(books.id, bookId))
      .returning();

    return {
      success: true,
      data: editBook[0],
      message: "Successfully created the book.",
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: "An error occurred while creating the book.",
    };
  }
};

export const deleteBookById = async (
  bookId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    await db.delete(books).where(eq(books.id, bookId));

    revalidatePath("/admin/books");

    return {
      success: true,
      message: "Successfully created the book.",
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: "An error occurred while creating the book.",
    };
  }
};

export const changeBookBorrowStatus = async ({
  status,
  borrowId,
}: {
  status: BOOK_STATUS;
  borrowId: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    await db
      .update(borrowRecords)
      .set({ status })
      .where(eq(borrowRecords.id, borrowId));

    revalidatePath("/admin/borrow-records");

    return {
      success: true,
      message: "Book status updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update book status", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
