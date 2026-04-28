import BookForm from "@/components/admin/forms/book-form";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const BooksEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const [bookDetails] = await db.select().from(books).where(eq(books.id, id));

  return (
    <div className="mt-8">
      <Button variant="outline" className="back-btn" asChild>
        <Link href={`/admin/books/details/${id}`}>
          <ArrowLeftIcon size={16} />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl mx-auto">
        <BookForm type="update" {...bookDetails} />
      </section>
    </div>
  );
};

export default BooksEditPage;
