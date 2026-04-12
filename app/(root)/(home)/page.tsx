import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { sampleBooks } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-20"
      />
    </>
  );
}
