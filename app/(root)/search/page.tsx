import BookList from "@/components/book-list";
import FilterSelect from "@/components/filter-select";
import SearchInput from "@/components/search-input";
import SearchNotFound from "@/components/search-not-found";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, or, desc, asc, sql, and } from "drizzle-orm";

const sortMap = {
  newest: desc(books.createdAt),
  oldest: asc(books.createdAt),
  highestRated: desc(books.rating),
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "newest" } = await searchParams;

  const isAvailable = sort === "available";

  const filteredBooks = await db
    .select()
    .from(books)
    .where(
      and(
        q
          ? or(ilike(books.title, `%${q}%`), ilike(books.author, `%${q}%`))
          : undefined,
        isAvailable ? sql`${books.availableCopies} > 0` : undefined,
      ),
    )
    .orderBy(sortMap[sort as keyof typeof sortMap] ?? sortMap.newest)
    .limit(20);

  return (
    <main>
      <section className="flex flex-col gap-3.5 justify-center items-center max-w-2xl mx-auto">
        <h3 className="font-semibold font-sans uppercase text-light-100">
          Discover Your Next Great Read:
        </h3>
        <h1 className="text-[60px] leading-16 font-sans font-semibold text-center text-white">
          Explore and Search for <span className="text-primary">Any Book</span>{" "}
          In Our Library
        </h1>
        <SearchInput />
      </section>

      <section className="mt-[70px]">
        <div className="flex justify-between items-center gap-3">
          <h3 className="font-semibold text-3xl font-sans text-light-100">
            {!q ? "All Books" : "Search Results"}
          </h3>
          <FilterSelect />
        </div>

        {filteredBooks.length > 0 ? (
          <BookList title="" books={filteredBooks} containerClassName="mt-20" />
        ) : (
          <SearchNotFound />
        )}
      </section>
    </main>
  );
}
