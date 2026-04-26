import BorrowingBooksList from "@/components/borrowing-books-list";
import EmptyState from "@/components/empty-state";
import Avatar from "@/components/avatar";
import { auth } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import { getBorrowedBooks } from "@/services/books";
import { getCurrentUser } from "@/services/user";

const MyProfilePage = async () => {
  const session = await auth();

  const { data } = await getBorrowedBooks(session?.user?.id as string);

  const mergedData = data.map((item) => ({
    book: item.books,
    borrow_record: item.borrow_records,
  }));

  const user = await getCurrentUser(session?.user?.id as string);

  return (
    <main className="profile w-full flex flex-col md:flex-row gap-10 relative">
      <div className="w-full md:w-1/2 md:sticky top-10 h-fit">
        <div className="gradient-blue pt-28 p-10 flex flex-col gap-8 rounded-xl">
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
        {data.length > 0 ? (
          <BorrowingBooksList
            title="Borrowed Books"
            data={mergedData}
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
