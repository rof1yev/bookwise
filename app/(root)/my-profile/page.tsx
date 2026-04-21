import Avatar from "@/components/avatar";
import BookList from "@/components/book-list";
import EmptyState from "@/components/empty-state";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { auth } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";

const MyProfilePage = async () => {
  const session = await auth();

  const data = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  const borrowedBooks = data.map((item) => item.books);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id as string))
    .limit(1);

  return (
    <main className="profile w-full flex gap-10 relative">
      <div className="w-full md:w-1/2 sticky top-10 h-fit">
        <div className="gradient-blue pt-28 p-10 flex flex-col gap-8">
          <Image
            src="/images/profile-badge.png"
            alt="Badge"
            width={58}
            height={88}
            className="absolute -top-2 left-1/2 -translate-x-1/2"
          />
          <div className="flex items-center gap-7">
            <div className="size-28 bg-[#232839] rounded-full flex justify-center items-center">
              <Avatar
                fallback={getInitials(user.fullName)}
                className="size-24"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-light-100 text-sm font-normal flex items-center gap-1 mb-2">
                <VerifiedIcon size={16} className="text-primary" /> Verified
                Student
              </p>
              <h2 className="text-white font-semibold text-2xl">
                {user.fullName}
              </h2>
              <p className="text-light-100 font-normal text-[18px]">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-light-100 font-normal text-[18px]">University</p>
            <h3 className="text-white font-semibold text-2xl">
              ROF1YEV University
            </h3>
          </div>
          <div className="flex flex-col">
            <p className="text-light-100 font-normal text-[18px]">Student ID</p>
            <h3 className="text-white font-semibold text-2xl">
              {user.universityId}
            </h3>
          </div>
          <div className="flex flex-col">
            <Image
              src={user.universityCard}
              alt="User card"
              width={300}
              height={0}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <section className="w-full md:w-1/2">
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
