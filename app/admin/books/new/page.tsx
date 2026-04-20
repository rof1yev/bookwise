import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookForm from "@/components/admin/forms/book-form";
import { ArrowLeftIcon } from "lucide-react";

const BooksCreatePage = () => {
  return (
    <>
      <Button
        className="back-btn bg-primary-admin hover:bg-primary-admin/80 transition-colors"
        asChild
      >
        <Link href="/admin/books">
          <ArrowLeftIcon size={16} />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl mx-auto">
        <BookForm />
      </section>
    </>
  );
};
export default BooksCreatePage;
