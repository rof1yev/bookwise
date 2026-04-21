import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import BookVideo from "@/components/book-video";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/lib/auth";
import { and, desc, eq, ne } from "drizzle-orm";
import { redirect } from "next/navigation";

const BooksDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const session = await auth();

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  const similarBooks = await db
    .select()
    .from(books)
    .where(
      and(eq(books.genre, bookDetails.genre), ne(books.id, bookDetails.id)),
    )
    .orderBy(desc(books.rating))
    .limit(6);

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video / {bookDetails.title}</h3>

            <BookVideo src={bookDetails.videoUrl} title={bookDetails.title} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary
                .split("\n")
                .map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
            </div>
          </section>
        </div>
      <section className="flex-1">
        <BookList
          title="Similar Books"
          books={similarBooks}
          containerClassName="mt-20"
        />
      </section>
      </div>
    </>
  );
};

export default BooksDetailsPage;
