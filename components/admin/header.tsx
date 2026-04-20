"use client";

import { useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  const name = data?.user?.name ?? "IN";

  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">{name}</h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>

      {/* <p>Search</p> */}
    </header>
  );
};
export default Header;
