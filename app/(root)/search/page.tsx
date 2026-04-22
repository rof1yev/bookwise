import BookList from "@/components/book-list";
import FilterSelect from "@/components/filter-select";
import SearchInput from "@/components/search-input";
import SearchNotFound from "@/components/search-not-found";
import { getBooks } from "@/services/books";
import Pagination from "./_components/pagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; page: string }>;
}) {
  const { q = "", sort = "", page = "1" } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 5;

  const isAvailable = sort === "available";

  const { data, totalCount } = await getBooks({
    q,
    sort,
    available: isAvailable,
    page: currentPage,
    pageSize,
  });

  return (
    <>
      <section className="flex flex-col gap-3.5 justify-center items-center max-w-2xl mx-auto">
        <h3 className="font-semibold font-sans uppercase text-light-100">
          Discover Your Next Great Read:
        </h3>
        <h1 className="text-5xl md:text-[60px] md:leading-16 font-sans font-semibold text-center text-white">
          Explore and Search for <span className="text-primary">Any Book</span>{" "}
          In Our Library
        </h1>
        <SearchInput />
      </section>

      <section className="mt-[70px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <h3 className="font-semibold text-3xl font-sans text-light-100">
            {!q ? "All Books" : "Search Results"}
          </h3>
          <FilterSelect />
        </div>

        {data.length > 0 ? (
          <BookList title="" books={data} containerClassName="mt-20" />
        ) : (
          <SearchNotFound />
        )}
      </section>

      <div className="mt-16">
        <Pagination
          sort={sort}
          q={q}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}
