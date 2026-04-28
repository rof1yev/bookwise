"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangleIcon,
  ArrowLeft,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { deleteBookById } from "@/lib/admin/actions/book";

const BooksTableDeleteAction = ({ bookId }: { bookId: string }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteBook = async (bookId: string) => {
    setIsDeleting(true);
    const result = await deleteBookById(bookId);

    setIsDeleting(false);

    if (result.success)
      toast.success("Successfully", { description: result.message });
    else toast.error("Error", { description: result.message });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2Icon
          size={18}
          className="text-red-600 cursor-pointer hover:text-red-700 transition-colors hover:opacity-75"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Do you want to delete the user?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The book will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 w-full flex-col sm:flex-row">
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-1/2 disabled:cursor-not-allowed disabled:opacity-55"
              disabled={isDeleting}
            >
              <ArrowLeft size={18} />
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-1/2 disabled:cursor-not-allowed disabled:opacity-55"
            disabled={isDeleting}
            onClick={() => handleDeleteBook(bookId)}
          >
            {isDeleting ? (
              <Loader2Icon size={18} className="animate-spin" />
            ) : (
              <AlertTriangleIcon size={18} />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BooksTableDeleteAction;
