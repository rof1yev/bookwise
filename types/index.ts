interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface BookCoverProps {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverImage: string;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}
