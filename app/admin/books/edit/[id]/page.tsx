import Link from "next/link";
import { getBookDetailsById } from "@/services/books";
import BookForm from "@/components/admin/forms/book-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const bookDetails = await getBookDetailsById(id);

  return {
    title: bookDetails.title,
    description: bookDetails.description,
  };
}

const BooksEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const bookDetails = await getBookDetailsById(id);

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
