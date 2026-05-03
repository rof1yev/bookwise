import Filter from "./_components/filter";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { asc, desc, eq, sql, SQL } from "drizzle-orm";
import Table from "./_components/table";

const sortMap: Record<string, SQL> = {
  newest: desc(books.createdAt),
  oldest: asc(books.createdAt),
};

export default async function BorrowRecords({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; page?: string }>;
}) {
  const { sort = "newest", page = 1 } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  const data = await db
    .select({ borrow: borrowRecords, user: users, book: books })
    .from(borrowRecords)
    .leftJoin(users, eq(borrowRecords.userId, users.id))
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.status, "BORROWED"))
    .orderBy(sortMap[sort])
    .limit(pageSize)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));

  const totalCount = countResult[0]?.count ?? 0;

  return (
    <section className="w-full rounded-2xl bg-white p-2.5 sm:p-7 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Filter />
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table
          tableClassName="overflow-x-auto mb-8"
          data={data}
          sort={sort}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
