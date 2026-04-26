"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";

const filters: { label: string; symbol: string; icon: LucideIcon }[] = [
  { label: "Newest to Recent", symbol: "newest", icon: ArrowDownIcon },
  { label: "Oldest to Recent", symbol: "oldest", icon: ArrowUpIcon },
];

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

  const filterLabel = filters.filter(
    (item) => item.symbol === currentSort,
  )?.[0];

  const changeSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") params.delete("sort");
    else params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm">
          {filterLabel.label} <ArrowUpDownIcon size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup className="text-sm">
          {filters.map(({ label, symbol, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              className="flex justify-between"
              onClick={() => changeSort(symbol)}
            >
              <span>{label}</span> <Icon size={16} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
