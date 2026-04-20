"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

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
