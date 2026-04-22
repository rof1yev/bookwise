"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const SearchNotFound = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return (
    <div className="flex items-center flex-col gap-3 justify-center max-w-md mx-auto mt-[70px]">
      <Image
        src="/images/search-not-found-image.png"
        alt="Not found search image"
        width={150}
        height={150}
        className="object-contain"
      />
      <h3 className="text-white font-semibold text-2xl">No Results Found</h3>
      <p className="font-normal text-base font-sans text-light-100 text-center">
        We couldn’t find any books matching your search. Try using different
        keywords or check for typos.
      </p>

      <Button
        onClick={handleClear}
        className="book-overview_btn w-fit md:w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        <p className="font-bebas-neue text-xl !text-dark-100">Clear Search</p>
      </Button>
    </div>
  );
};

export default SearchNotFound;
