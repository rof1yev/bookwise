"use client";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./avatar";
import { useSession } from "next-auth/react";
import UserDropDown from "./user-dropdown";

const Header = () => {
  const pathname = usePathname();
  const { data } = useSession();

  const name = data?.user?.name ?? "IN";

  return (
    <header className="flex justify-between gap-5 w-full py-5 sm:px-8">
      <Link href="/" className="flex gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-light-100 font-semibold text-2xl hidden sm:block">BookWise</span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/" ? "text-light-200" : "text-light-100",
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/search" ? "text-light-200" : "text-light-100",
            )}
          >
            Search
          </Link>
        </li>
        <li>
          <UserDropDown>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar src="" fallback={getInitials(name)} />
            </div>
          </UserDropDown>
        </li>
      </ul>
    </header>
  );
};

export default Header;
