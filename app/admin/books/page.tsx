import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "./_components/filter";
import BooksTable from "./_components/books-table";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { asc, desc, sql, SQL } from "drizzle-orm";

const sortMap: Record<string, SQL> = {
  az: asc(books.title),
  za: desc(books.title),
  newest: desc(books.createdAt),
  oldest: asc(books.createdAt),
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; page?: string }>;
}) {
  const { sort = "newest", page = 1 } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  const data = await db
    .select()
    .from(books)
    .orderBy(sortMap[sort])
    .limit(pageSize)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(books);

  const totalCount = countResult[0]?.count ?? 0;

  return (
    <section className="w-full rounded-2xl bg-white p-7 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        <div className="flex gap-5">
          <Filter />
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BooksTable
          tableClassName="overflow-x-auto mb-8"
          books={data}
          sort={sort}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
