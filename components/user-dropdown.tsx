"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboardIcon, LogOutIcon, User2Icon } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserDropDown = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data } = useSession();

  const name = data?.user?.name ?? "IN";
  const email = data?.user?.email ?? "";

  const logout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/sign-in" });

      toast.success("Successfully logged out", {
        description: "You have been logged out of your account",
      });
    } catch {
      toast.error("Failed to logout", {
        description: "Please try again later",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isMeta = isMac ? e.metaKey : e.ctrlKey;

      if (!e.shiftKey || !isMeta) return;

      switch (e.key.toLowerCase()) {
        case "d":
          e.preventDefault();
          router.push("/admin");
          break;

        case "p":
          e.preventDefault();
          router.push("/my-profile");
          break;

        case "q":
          e.preventDefault();
          logout();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-45 " align="end" sideOffset={4}>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">
              {name}
            </span>
            <span className="text-xs truncate max-w-40 text-muted-foreground">
              {email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            <LayoutDashboardIcon />
            Dashboard
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>All</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push("/my-profile")}>
            <User2Icon />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOutIcon />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropDown;
