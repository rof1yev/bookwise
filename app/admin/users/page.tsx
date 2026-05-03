import { db } from "@/database/drizzle";
import { asc, count, desc, eq, sql, SQL } from "drizzle-orm";
import { borrowRecords, users } from "@/database/schema";
import UsersTable from "@/app/admin/users/_components/users-table";
import Filter from "./_components/filter";

const sortMap: Record<string, SQL> = {
  az: asc(users.fullName),
  za: desc(users.fullName),
  newest: desc(users.createdAt),
  oldest: asc(users.createdAt),
};

export default async function AllUsers({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; page?: string }>;
}) {
  const { sort = "newest", page = "1" } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  const data = await db
    .select({ user: users, borrowedCount: count(borrowRecords.id) })
    .from(users)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
    .groupBy(users.id)
    .orderBy(sortMap[sort])
    .limit(pageSize)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const totalCount = countResult[0]?.count ?? 0;

  return (
    <div className="mt-6 bg-white p-2.5 sm:py-6 sm:px-5 rounded-[14px]">
      <div className="flex items-center justify-between gap-3.5">
        <h3 className="text-dark-400 font-semibold text-xl">All Users</h3>
        <Filter />
      </div>

      <UsersTable
        data={data}
        tableClassName="mt-5 p-2.5 mb-8"
        sort={sort}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
