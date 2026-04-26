import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { and, gte, lte, sql } from "drizzle-orm";
import { ArrowUpIcon } from "lucide-react";

const BorrowCardStatistic = async () => {
  const countAllRequests = await db
    .select({ count: sql<number>`count(*)` })
    .from(borrowRecords);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayAllRequest = await db
    .select({ count: sql<number>`count(*)` })
    .from(borrowRecords)
    .where(
      and(
        gte(borrowRecords.createdAt, startOfDay),
        lte(borrowRecords.createdAt, endOfDay),
      ),
    );

  return (
    <div className="bg-white p-2.5 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <p className="font-medium">Borrowed Books</p>
          <div className="flex items-center text-green-600">
            {todayAllRequest[0].count > 0 && <ArrowUpIcon size={14} />}
            {todayAllRequest[0].count > 0 && (
              <span>{todayAllRequest[0].count}</span>
            )}
          </div>
        </div>
        <p className="font-semibold text-2xl text-dark-400">
          {countAllRequests[0].count}
        </p>
      </div>
    </div>
  );
};

export default BorrowCardStatistic;
