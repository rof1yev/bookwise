"use client";

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { format } from "date-fns";
import Pagination from "./pagination";
import Avatar from "@/components/avatar";
import Link from "next/link";
import StatusAction from "./status-action";

const Table = ({
  data,
  tableClassName,
  sort,
  totalCount,
  pageSize,
  currentPage,
}: {
  data: User[];
  tableClassName?: string;
  sort: string;
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  return (
    <div>
      <>
        <TableUI className={tableClassName}>
          <TableHeader className="bg-[#F8F8FF] h-12">
            <TableRow>
              <TableHead className="font-normal text-sm md:w-96">
                Name
              </TableHead>
              <TableHead className="font-normal text-sm">Date Joined</TableHead>
              <TableHead className="font-normal text-sm">
                University ID No
              </TableHead>
              <TableHead className="font-normal text-sm">
                University ID Card
              </TableHead>
              <TableHead className="text-right font-normal text-sm">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-medium">
            {data.length > 0 ? (
              <>
                {data.map((user) => (
                  <TableRow key={user.id} className="h-16">
                    <TableCell className="text-wrap md:w-96">
                      <div className="flex gap-1.5 items-center">
                        <Avatar
                          src=""
                          fallback={user?.fullName as string}
                          className="size-10"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-dark-400 font-semibold text-sm">
                            {user?.fullName}
                          </h4>
                          <p className="text-[#64748B] font-normal text-sm">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(user.createdAt!, "dd MMM, yyyy")}
                    </TableCell>
                    <TableCell>{user.universityId}</TableCell>
                    <TableCell>
                      <Link href={user.universityCard} target="_blank">
                        View ID Card
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusAction user={user} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No account requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableUI>
        <>
          {totalCount > pageSize && (
            <Pagination
              sort={sort}
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          )}
        </>
      </>
    </div>
  );
};

export default Table;
