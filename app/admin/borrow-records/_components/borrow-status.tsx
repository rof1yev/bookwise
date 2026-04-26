"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeBookBorrowStatus } from "@/lib/admin/actions/book";
import { cn } from "@/lib/utils";
import { BOOK_STATUS, User } from "@/types";
import { CheckCheckIcon, CheckIcon } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";

const statusText: Record<string, string> = {
  BORROWED: "BORROWED",
  RETURNED: "RETURNED",
};

const statusIcons: Record<string, ReactNode> = {
  BORROWED: <CheckIcon size={16} />,
  RETURNED: <CheckCheckIcon size={16} />,
};

const BorrowStatus = ({
  status,
  borrowId,
}: {
  status: BOOK_STATUS;
  borrowId: string;
}) => {
  const handleChangeBorrowStatus = async (status: BOOK_STATUS) => {
    const result = await changeBookBorrowStatus({ status, borrowId });

    if (result.success)
      toast.success("Successfully!", { description: result.message });
    else toast.error("Error", { description: result.message });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p
          className={cn(
            "w-fit px-2.5 py-1 cursor-pointer flex gap-2 items-center",
            status === "RETURNED" && "bg-green-100 text-green-700",
            status === "BORROWED" && "bg-sky-100 text-sky-700",
          )}
        >
          {statusIcons[status]}
          {status}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-42">
        <DropdownMenuGroup>
          {Object.keys(statusText).map((statusText) => (
            <DropdownMenuItem
              key={statusText}
              className="flex justify-between gap-1 cursor-pointer font-medium"
              onClick={() =>
                handleChangeBorrowStatus(statusText as BOOK_STATUS)
              }
            >
              <p
                className={cn(
                  "w-full px-2.5 py-1 cursor-pointer flex gap-2 items-center",
                  statusText === "RETURNED" && "bg-green-100 text-green-700",
                  statusText === "BORROWED" && "bg-sky-100 text-sky-700",
                )}
              >
                {statusIcons[statusText]}
                {statusText}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BorrowStatus;
