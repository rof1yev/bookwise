import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import BorrowRequests from "./_components/borrow-requests";
import UsersRequests from "./_components/users-requests";
import Link from "next/link";
import BorrowCardStatistic from "./_components/cards/borrow-card";
import TotalUsersCard from "./_components/cards/total-users-card";
import TotalBooksCard from "./_components/cards/total-books-card";
import RecentlyAddedBooks from "./_components/recently-added-books";
import LinearGradientBottom from "./_components/linear-gradient-bottom";
import { cn } from "@/lib/utils";

const AdminMainPage = async () => {
  const borrowRequests = await db
    .select({ borrow: borrowRecords, book: books, user: users })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .limit(3);

  const allBooks = await db.select({ book: books }).from(books).limit(5);

  const userRequests = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"));

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        <BorrowCardStatistic />
        <TotalUsersCard />
        <TotalBooksCard />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-3 sm:p-5 rounded-[14px] w-full min-h-full relative overflow-hidden max-h-[400px]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base md:text-xl">
              Borrow Requests
            </h3>
            <Link href="/admin/borrow-records">
              <Button className="bg-[#F8F8FF] text-primary-admin hover:bg-primary-admin hover:text-white">
                View all
              </Button>
            </Link>
          </div>
          <div className={cn("pr-1 overflow-hidden max-h-[350px]")}>
            <BorrowRequests data={borrowRequests} />
          </div>
          {borrowRequests.length > 2 && <LinearGradientBottom />}
        </div>
        {/*  */}
        <div className="bg-white p-3 sm:p-5 md:row-span-2 rounded-[14px] relative h-auto overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base md:text-xl">
              Recently Added Books
            </h3>
            <Button className="bg-[#F8F8FF] text-primary-admin hover:bg-primary-admin hover:text-white">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div
              role="button"
              className="flex items-center bg-[#F8F8FF] rounded-[10px] p-2.5 sm:p-3.5 gap-3.5 group"
            >
              <div className="bg-white h-8 sm:h-12 w-8 sm:w-12 rounded-full flex items-center justify-center group-hover:bg-primary-admin transition-all group-hover:text-white">
                <PlusIcon size={24} />
              </div>
              <h4 className="font-medium text-dark-400">Add new book</h4>
            </div>
            <RecentlyAddedBooks allBooks={allBooks} />
          </div>
          <LinearGradientBottom />
        </div>
        {/*  */}
        <div className="bg-white p-3 sm:p-5 rounded-[14px] relative min-h-[150px] h-auto overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base md:text-xl">
              Account Requests
            </h3>
            <Link href="/admin/account-requests">
              <Button className="bg-[#F8F8FF] text-primary-admin hover:bg-primary-admin hover:text-white">
                View all
              </Button>
            </Link>
          </div>
          <UsersRequests data={userRequests} />
          {userRequests.length > 2 && <LinearGradientBottom />}
        </div>
      </section>
    </main>
  );
};

export default AdminMainPage;
