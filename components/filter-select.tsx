"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sorts } from "@/lib/constants";
import { useSearchParams, useRouter } from "next/navigation";

const FilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("sort", value);
    else params.delete("sort");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-[#232839] flex w-full max-w-56 p-2.5 rounded-md flex items-center">
      <span className="text-light-100 text-nowrap font-normal text-base">
        Filter by:
      </span>

      <Select value={currentSort || ""} onValueChange={onChange}>
        <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 focus:outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end" side="bottom">
          <SelectGroup>
            <SelectLabel>Filter by:</SelectLabel>
            {sorts.map(({ value, label }, i) => (
              <SelectItem
                key={i}
                value={value}
                className="data-[state=checked]:text-primary data-[state=checked]:font-semibold"
              >
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
