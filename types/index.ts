export interface Book {
  id: string;
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
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface BookCoverProps {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverImage: string;
}

export type BookCoverVariant =
  | "extraSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide";

export interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

export interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}

export interface PageParamsProps {
  params?: Record<string, string | undefined | unknown>;
  searchParams?: Record<string, string>;
}

export interface BookBorrowParams {
  userId: string;
  bookId: string;
  dueDate: string;
}

export interface BorrowRecords {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: Date | null;
  dueDate: string;
  returnDate: string | null;
  status: "BORROWED" | "RETURNED" | null;
  createdAt: Date | null;
}

export interface BorrowingBooksListProps {
  title: string;
  data: { borrow_record: BorrowRecords; book: Book }[];
  containerClassName?: string;
}

// DATA FETCHING

export interface GetBooksResponse {
  data: Book[];
  totalCount: number;
}

export interface GetBorrowedBookResponse {
  borrow_records: BorrowRecords;
  books: Book;
}

// USER
export interface User {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  lastActivityDate: string | null;
  createdAt: Date | null;
}

// ROLES
export type ROLES = "USER" | "ADMIN";
// STATUS
export type STATUS = "PENDING" | "APPROVED" | "REJECTED";
export type BOOK_STATUS = "BORROWED" | "RETURNED";
