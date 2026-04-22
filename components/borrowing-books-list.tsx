import { BorrowingBooksListProps } from "@/types";
import { BorrowingBookCard } from "./borrowing-book-card";

const BorrowingBooksList = ({
  title,
  data,
  containerClassName,
}: BorrowingBooksListProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="borrowing-books-list">
        {data.map(({ book, borrow_record }) => (
          <BorrowingBookCard
            key={book.id}
            book={book}
            borrow_record={borrow_record}
          />
        ))}
      </ul>
    </section>
  );
};

export default BorrowingBooksList;
