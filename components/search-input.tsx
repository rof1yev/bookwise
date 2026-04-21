"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") || "");

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) params.set("q", debouncedValue);
    else params.delete("q");

    router.push(`?${params.toString()}`);
  }, [debouncedValue]);

  return (
    <div className="search">
      <Input
        placeholder="Search for books..."
        className="search-input pl-14"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchIcon size={24} className="absolute left-6 text-primary" />
    </div>
  );
};

export default SearchInput;
