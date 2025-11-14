import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <Link href={"/home"}>
      <div className="bg-white w-full h-14 fixed z-50 flex items-center justify-between px-6 border border-[#E4E4E7]">
        <h1 className="text-black text-[24px] font-semibold ">Quiz app</h1>
        <UserButton/>
      </div>
    </Link>
  );
};
