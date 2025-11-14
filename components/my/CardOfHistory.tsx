"use client";
import React, {
  createContext,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QuizPage } from "./Quizpage";
import { cleanAndParseJSON } from "@/lib/clearJson";
import { Divide, Loader } from "lucide-react";
const Summarize = createContext({});
export const CardOfHistory = () => {
  const searchParams = useParams();

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [summary, setSummary] = useState<string>();
  const [newMap, setNewMap] = useState();
  const [data, setData] = useState<any>();
  const { id } = searchParams;

  useEffect(() => {
    if (id) {
      getHistory(id);
    }
  }, [id]);
  async function getHistory(id: any) {
    try {
      const response = await fetch("/api/summarization", {
        method: "GET",
      });
      console.log(id);
      const data = await response.json();
      const gg = data.data?.filter((a: any) => a.id == id);
      setData(gg);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate quiz");
    }
  }

  return (
    <div>
      <div className="w-full justify-center">
        <div className="w-full justify-center px-64 pt-20">
          <Card className="w-full">
            <CardHeader className="flex-col flex">
              <CardTitle className="flex items-center">
                <svg
                  className="mt-[-3px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M6.66667 4V9.33333M25.3333 22.6667V28M4 6.66667H9.33333M22.6667 25.3333H28M16 4L13.4507 11.7507C13.3202 12.1473 13.0984 12.5078 12.8031 12.8031C12.5078 13.0984 12.1473 13.3202 11.7507 13.4507L4 16L11.7507 18.5493C12.1473 18.6798 12.5078 18.9016 12.8031 19.1969C13.0984 19.4922 13.3202 19.8527 13.4507 20.2493L16 28L18.5493 20.2493C18.6798 19.8527 18.9016 19.4922 19.1969 19.1969C19.4922 18.9016 19.8527 18.6798 20.2493 18.5493L28 16L20.2493 13.4507C19.8527 13.3202 19.4922 13.0984 19.1969 12.8031C18.9016 12.5078 18.6798 12.1473 18.5493 11.7507L16 4Z"
                    stroke="#09090B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <CardAction className="font-bold text-[24px] ml-2">
                  Article Quiz Generator
                </CardAction>
              </CardTitle>
              <CardDescription className="text-[18px] font-bold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                >
                  <path
                    d="M7.16667 3.16667C7.16667 2.45942 6.88571 1.78115 6.38562 1.28105C5.88552 0.780951 5.20724 0.5 4.5 0.5H0.5V10.5H5.16667C5.6971 10.5 6.20581 10.7107 6.58088 11.0858C6.95595 11.4609 7.16667 11.9696 7.16667 12.5M7.16667 3.16667V12.5M7.16667 3.16667C7.16667 2.45942 7.44762 1.78115 7.94771 1.28105C8.44781 0.780951 9.12609 0.5 9.83333 0.5H13.8333V10.5H9.16667C8.63623 10.5 8.12753 10.7107 7.75245 11.0858C7.37738 11.4609 7.16667 11.9696 7.16667 12.5"
                    stroke="#09090B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Summarized content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!data && (
                <div className="mt-[-7] h-45 flex justify-center items-center">
                  <Loader
                    className="animate-spin w-10 h-10 mt-[-30]"
                    strokeWidth={1.5}
                  />
                </div>
              )}
              {data?.map((e: any, i: number) => (
                <div className="mt-[-7]" key={i}>
                  <h1 className="text-[26px] font-bold">{e.title}</h1>
                  <p>{e.summary}</p>
                  <div className="flex items-center gap-1 mt-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                        fill="black"
                      />
                    </svg>
                    <p className="text-muted-foreground text-[14px] font-semibold">
                      Article Content
                    </p>
                  </div>
                  <p>{e.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
