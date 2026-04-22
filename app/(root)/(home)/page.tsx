import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getBooks } from "@/services/books";
import Image from "next/image";
import Link from "next/link";

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

      <div className="w-full mt-16">
        <Link href="/search" className="flex justify-center">
          <Button
            type="button"
            className="book-overview_btn w-full max-w-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Image
              src="/icons/book.svg"
              alt="Book image"
              width={20}
              height={20}
            />
            <p className="font-bebas-neue text-xl !text-dark-100 ">
              Load More Books
            </p>
          </Button>
        </Link>
      </div>
    </>
  );
}
