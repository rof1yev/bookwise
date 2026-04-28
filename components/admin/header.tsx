"use client";

import { SearchIcon } from "lucide-react";
import GreetingTitle from "../greeting-title";
import { Input } from "../ui/input";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <header className="admin-header">
      <div className="w-full flex justify-between items-center">
        <GreetingTitle title={title} description={subTitle} />

        {/* <div className="relative w-full max-w-[450px]">
          <Input
            className="p-3.5 w-full pl-11 h-12"
            placeholder="Search users, books by title, author, or genre."
          />
          <SearchIcon
            size={18}
            className="text-light-100 absolute left-4 top-1/2 -translate-y-1/2"
          />
        </div> */}
      </div>
    </header>
  );
};
export default Header;
