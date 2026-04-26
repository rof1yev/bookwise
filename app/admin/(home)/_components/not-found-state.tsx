"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface NotFoundStateProps {
  src: string;
  title: string;
  description: string;
  className?: string;
}

const NotFoundState = ({
  src,
  title,
  description,
  className,
}: NotFoundStateProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-5 mt-8", className)}>
      <Image
        src={src}
        alt="Not found placeholder image"
        width={190}
        height={144}
      />
      <div className="flex flex-col gap-1.5 items-center">
        <h4 className="font-semibold text-base text-dark-400">{title}</h4>
        <p className="text-[#64748B] text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default NotFoundState;
