import BookList from "@/components/book-list";
import EmptyState from "@/components/empty-state";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

const MyProfilePage = async () => {
  const session = await auth();

  const data = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  const borrowedBooks = data.map((item) => item.books);

  return (
    <main>
      <div>
        <h1 className="text-2xl font-semibold text-white md:text-7xl">
          My Profile
        </h1>
      </div>
      <section>
        {borrowedBooks.length > 0 ? (
          <BookList
            title="Borrowed Books"
            books={borrowedBooks}
            containerClassName="mt-20"
          />
        ) : (
          <EmptyState
            title="No Borrowed Books"
            description="You have not borrowed any books yet."
          />
        )}
      </section>
    </main>
  );
};

export default MyProfilePage;
