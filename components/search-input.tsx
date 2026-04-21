"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get("q") || "";
  const [value, setValue] = useState(initial);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) params.set("q", debouncedValue);
    else params.delete("q");

    router.replace(`?${params.toString()}`);
  }, [debouncedValue]);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  return (
    <div className="search">
      <Input
        value={value}
        placeholder="Search for books..."
        className="search-input pl-14"
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchIcon size={24} className="absolute left-6 text-primary" />
    </div>
  );
};

export default SearchInput;
