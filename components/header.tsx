"use client";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./avatar";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <header className="flex justify-between gap-5 w-full py-5 px-8">
      <Link href="/" className="flex gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-light-100 font-semibold text-2xl">BookWise</span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="/my-profile"
            className="flex items-center gap-2 text-light-100"
          >
            <Avatar src="" fallback={getInitials(data?.user?.name || "IN")} />
            <span>{data?.user?.name}</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
