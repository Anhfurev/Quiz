import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <Link href={"/home"}>
      <div className="bg-white w-full h-14 fixed z-50 flex items-center justify-between border border-[#E4E4E7] left-0 top-0">
        <h1 className="text-black text-[24px] font-semibold px-6 ">Quiz app</h1>
        <div className="mr-5">
          <UserButton />
        </div>
      </div>
    </Link>
  );
};
