import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, or, desc, asc, sql, and } from "drizzle-orm";

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
  sort?: "newest" | "oldest" | "highestRated" | "";
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
