import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
      <Link href="/" className="flex gap-0.5 items-center">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <span className="text-white">BookWise</span>
      </Link>

      <div className="flex">
        <p className="text-white">
          {startYear === currentYear
            ? startYear
            : `${startYear}-${currentYear}`}{" "}
          All Rights Reserved.
        </p>
      </div>

      <div className="hidden md:block" />
    </footer>
  );
};

export default Footer;
