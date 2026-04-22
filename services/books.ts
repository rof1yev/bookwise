import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { Book, GetBooksResponse, GetBorrowedBookResponse } from "@/types";
import { ilike, or, desc, asc, sql, and, eq, ne } from "drizzle-orm";

const sortMap = {
  newest: desc(books.createdAt),
  oldest: asc(books.createdAt),
  highestRated: desc(books.rating),
};

export async function getBooks({
  q = "",
  sort = "",
  page = 1,
  pageSize = 5,
  available = false,
}: {
  q?: string;
  sort?: "newest" | "oldest" | "highestRated" | string;
  page?: number;
  pageSize?: number;
  available?: boolean;
}): Promise<GetBooksResponse> {
  const offset = (page - 1) * pageSize;

  const whereCondition = and(
    q
      ? or(ilike(books.title, `%${q}%`), ilike(books.author, `%${q}%`))
      : undefined,
    available ? sql`${books.availableCopies} > 0` : undefined,
  );

  const data = await db
    .select()
    .from(books)
    .where(whereCondition)
    .orderBy(sortMap[sort as keyof typeof sortMap] ?? sortMap.newest)
    .limit(pageSize)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(books)
    .where(whereCondition);

  const totalCount = countResult[0]?.count ?? 0;

  return {
    data,
    totalCount,
  };
}

export async function getBorrowedBooks(
  userId: string,
): Promise<{ data: GetBorrowedBookResponse[] }> {
  const data = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId));

  return { data };
}

export async function getBookDetailsById(id: string): Promise<Book> {
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  return bookDetails;
}

export async function getSimilarBooks(
  genre: string,
  bookId: string,
): Promise<Book[]> {
  const similarBooks = await db
    .select()
    .from(books)
    .where(and(eq(books.genre, genre), ne(books.id, bookId)))
    .orderBy(desc(books.rating))
    .limit(4);

  return similarBooks;
}
