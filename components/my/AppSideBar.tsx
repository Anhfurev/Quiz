"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export function AppSidebar() {
  useEffect(() => {
    getHistory();
  }, []);
  const [data, setData] = useState<any>();
  async function getHistory() {
    try {
      const response = await fetch("/api/summarization", {
        method: "GET",
      });
      const data = await response.json();

      setData(data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate quiz");
    }
  }
  return (
    <Sidebar className=" bg-white border-none">
      <SidebarHeader />
      <SidebarContent className="p-4 pt-12 border-0 bg-white flex flex-col gap-1 ">
        <h1 className="text-[20px] pt-2 font-bold text-black">History</h1>
        <div className="flex flex-col gap-2">
          {data?.map((x: any, i: any) => (
            <Link key={i} href={`/home/history/${x.id}`}>
              <Button className="text-[16px] w-60 font-medium text-black py-2 bg-white hover:bg-accent">
                {x.title}
              </Button>
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
