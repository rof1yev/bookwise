import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { auth } from "@/lib/auth";
import { getBooks } from "@/services/books";

export default async function Home() {
  const session = await auth();

  const { data } = await getBooks({
    pageSize: 10,
    sort: "newest",
  });

  return (
    <>
      <BookOverview {...data[0]} userId={session?.user?.id as string} />
      <BookList title="Latest Books" books={data} containerClassName="mt-20" />
    </>
  );
}
