"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { changeUserRole } from "@/lib/admin/actions/user";
import { ROLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ROLES as USER_ROLES_TYPE } from "@/types";
import { format } from "date-fns";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import UsersTableAction from "./users-table-action";
import Pagination from "./pagination";

interface DataType {
  user: {
    id: string;
    fullName: string;
    email: string;
    universityId: number;
    password: string;
    universityCard: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | null;
    role: "ADMIN" | "USER" | null;
    lastActivityDate: string | null;
    createdAt: Date | null;
  };
  borrowedCount: number;
}

const statusText = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const roleStyles: Record<string, string> = {
  ADMIN: "bg-[#ECFDF3] text-[#027A48]",
  USER: "bg-[#FDF2FA] text-[#C11574]",
};

const UsersTable = ({
  data,
  tableClassName,
  sort,
  totalCount,
  currentPage,
  pageSize,
}: {
  data: DataType[];
  tableClassName: string;
  sort: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}) => {
  const handleChangeRole = async (role: USER_ROLES_TYPE, userId: string) => {
    const result = await changeUserRole({
      userId,
      role,
    });

    if (result.success)
      toast.success("Successfully", { description: result.message });
    else toast.error("Error", { description: result.message });
  };

  return (
    <>
      <Table className={tableClassName}>
        <TableHeader className="bg-[#F8F8FF] h-12">
          <TableRow>
            <TableHead className="font-normal text-sm">№</TableHead>
            <TableHead className="font-normal text-sm w-60">Name</TableHead>
            <TableHead className="font-normal text-sm">Date Joined</TableHead>
            <TableHead className="font-normal text-sm">Role</TableHead>
            <TableHead className="font-normal text-sm">
              Books Borrowed
            </TableHead>
            <TableHead className="font-normal text-sm">
              University ID No
            </TableHead>
            <TableHead className="font-normal text-sm">
              University ID Card
            </TableHead>
            <TableHead className="font-normal text-sm">Status</TableHead>
            <TableHead className="text-right font-normal text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium">
          {data.length > 0 ? (
            <>
              {data.map(({ user, borrowedCount }, i) => (
                <TableRow key={user.id} className="h-16">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    {format(user.createdAt!, "dd MM, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <p
                          className={cn(
                            "w-fit px-2.5 py-1 rounded-2xl text-sm cursor-pointer",
                            roleStyles[user.role!] ||
                              "bg-gray-100 text-gray-600",
                          )}
                        >
                          {`${user.role?.charAt(0).toUpperCase()}${user.role?.slice(1).toLowerCase()}`}
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          {ROLES.map((role) => (
                            <DropdownMenuItem
                              onClick={() =>
                                handleChangeRole(
                                  role.toUpperCase() as USER_ROLES_TYPE,
                                  user.id,
                                )
                              }
                              key={role}
                              className="flex justify-between gap-1 cursor-pointer font-medium"
                            >
                              <p
                                className={cn(
                                  "w-fit px-2.5 py-1 rounded-2xl text-sm cursor-pointer",
                                  user.role?.toLowerCase() === role
                                    ? roleStyles[role.toUpperCase()]
                                    : (user.role !== "ADMIN" &&
                                        "bg-[#ECFDF3] text-[#027A48]") ||
                                        (user.role !== "USER" &&
                                          "bg-[#FDF2FA] text-[#C11574]"),
                                )}
                              >
                                {`${role?.charAt(0).toUpperCase()}${role?.slice(1).toLowerCase()}`}
                              </p>
                              {user.role?.toLowerCase() === role && (
                                <CheckIcon
                                  size={18}
                                  className="text-dark-400"
                                />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{borrowedCount}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <Link
                      href={user.universityCard}
                      target="_blank"
                      className="flex items-center gap-2 text-[#0089F1]"
                    >
                      View ID Card
                      <Image
                        src="/images/export.png"
                        alt="Share icon"
                        width={16}
                        height={16}
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={cn(
                        "px-2 py-1 w-fit rounded-sm",
                        user.status === "APPROVED" &&
                          "bg-green-100 text-green-700",
                        user.status === "REJECTED" &&
                          "bg-[#FDF2FA] text-[#C11574]",
                        user.status === "PENDING" && "bg-sky-100 text-sky-700",
                      )}
                    >
                      <p>{statusText[user.status!]}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <UsersTableAction userId={user.id} />
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
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalCount > pageSize && (
        <Pagination
          sort={sort}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </>
  );
};

export default UsersTable;
