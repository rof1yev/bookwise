import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const createQueryString = (
  params: URLSearchParams,
  key: string,
  value: string,
) => {
  const newParams = new URLSearchParams(params.toString());
  newParams.set(key, value);
  return newParams.toString();
};
