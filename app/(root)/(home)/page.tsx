import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks}
        containerClassName="mt-20"
      />
    </>
  );
}
