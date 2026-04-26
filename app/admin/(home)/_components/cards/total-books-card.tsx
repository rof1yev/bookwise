import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, gte, lte, sql } from "drizzle-orm";
import { ArrowUpIcon } from "lucide-react";

const TotalBooksCard = async () => {
  const allBooksCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(books);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayJoinedBooksCount = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(books)
    .where(
      and(gte(books.createdAt, startOfDay), lte(books.createdAt, endOfDay)),
    );

  const todayCount = todayJoinedBooksCount[0]?.count || 0;

  return (
    <div className="bg-white p-2.5 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <p className="font-medium">Total Books</p>
          {todayCount > 0 && (
            <div className="flex items-center text-green-600">
              <ArrowUpIcon size={14} />
              <span>{todayCount}</span>
            </div>
          )}
        </div>
        <p className="font-semibold text-2xl text-dark-400">
          {allBooksCount[0]?.count || 0}
        </p>
      </div>
    </div>
  );
};

export default TotalBooksCard;
