"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeUserStatus } from "@/lib/admin/actions/user";
import { cn } from "@/lib/utils";
import { STATUS, User } from "@/types";
import { BanIcon, CheckCheckIcon, InfoIcon, LoaderIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

const statusText: Record<string, string> = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-sky-100 text-sky-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-[#FDF2FA] text-[#C11574]",
};

const statusIcons: Record<string, ReactNode> = {
  PENDING: <LoaderIcon size={16} />,
  APPROVED: <CheckCheckIcon size={16} />,
  REJECTED: <BanIcon size={16} />,
};

const statusDialogText = {
  PENDING: {
    title: "Set as Pending",
    description:
      "This will move the user back to pending status. They won’t have full access until approved.",
    icon: (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-sky-500/20" />
        <div className="relative bg-sky-500 w-20 h-20 rounded-full flex justify-center items-center">
          <LoaderIcon size={30} className="text-white" />
        </div>
      </div>
    ),
    confirmText: "Set to Pending",
    classNameBtn: "bg-sky-600 hover:bg-sky-700 transition-all",
  },

  REJECTED: {
    title: "Deny Account Request",
    description:
      "Denying this request will notify the student they are not eligible due to unsuccessful ID card verification.",
    icon: (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-[#F46F70]/20" />
        <div className="relative bg-[#F46F70] w-20 h-20 rounded-full flex justify-center items-center">
          <InfoIcon size={30} className="text-white" />
        </div>
      </div>
    ),
    confirmText: "Deny & Notify Student",
    classNameBtn: "bg-[#F46F70] hover:bg-[#F46F70]/80 transition-all",
  },

  APPROVED: {
    title: "Approve Account",
    description:
      "Approving this request will grant the user full access to the system.",
    icon: (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-green-500/20" />
        <div className="relative bg-green-500 w-20 h-20 rounded-full flex justify-center items-center">
          <CheckCheckIcon size={30} className="text-white" />
        </div>
      </div>
    ),
    confirmText: "Approve User",
    classNameBtn: "bg-green-500 hover:bg-green-600 transition-all",
  },
};

const StatusAction = ({ user }: { user: User }) => {
  const [selectedStatus, setSelectedStatus] = useState<STATUS | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeUserRole = async (status: STATUS, userId: string) => {
    const result = await changeUserStatus({ userId, status });

    if (result.success)
      toast.success("Successfully!", { description: result.message });
    else toast.error("Error", { description: result.message });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p
            className={cn(
              "w-fit px-2.5 py-1 ml-auto cursor-pointer flex gap-2 items-center",
              statusColors[user.status!],
            )}
          >
            {statusIcons[user.status!]}
            {user.status}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            {Object.keys(statusText).map((statusText) => (
              <DropdownMenuItem
                key={statusText}
                className="flex justify-between gap-1 cursor-pointer font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStatus(statusText as STATUS);
                  setOpen(true);
                }}
              >
                <p
                  className={cn(
                    "w-full px-2.5 py-1 cursor-pointer flex gap-2 items-center",
                    statusColors[statusText],
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-5">
              {statusDialogText[selectedStatus!]?.icon}
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              {statusDialogText[selectedStatus!]?.title}
            </DialogTitle>
            <DialogDescription className="text-center text-[#64748B] font-normal">
              {statusDialogText[selectedStatus!]?.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 w-full flex-col sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-1/2">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className={cn(
                "text-white w-full sm:w-1/2",
                statusDialogText[selectedStatus!]?.classNameBtn,
              )}
              onClick={() => {
                if (selectedStatus) {
                  handleChangeUserRole(selectedStatus, user.id);
                  setOpen(false);
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusAction;
