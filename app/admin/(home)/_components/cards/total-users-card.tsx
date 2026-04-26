import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { and, gte, lte, sql } from "drizzle-orm";
import { ArrowUpIcon } from "lucide-react";

const TotalUsersCard = async () => {
  const totalUsers = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayJoinedUsersCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      and(gte(users.createdAt, startOfDay), lte(users.createdAt, endOfDay)),
    );

  const todayCount = todayJoinedUsersCount[0]?.count || 0;

  return (
    <div className="bg-white p-2.5 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <p className="font-medium">Total Users</p>
          {todayCount > 0 && (
            <div className="flex items-center text-green-600">
              <ArrowUpIcon size={14} />
              <span>{todayCount}</span>
            </div>
          )}
        </div>
        <p className="font-semibold text-2xl text-dark-400">
          {totalUsers[0]?.count || 0}
        </p>
      </div>
    </div>
  );
};

export default TotalUsersCard;
