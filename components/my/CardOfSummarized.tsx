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
const Summarize = createContext({});
export const CardOfSummarized = () => {
  const searchParams = useParams();

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [quiz, setQuiz] = useState("");
  const [page, setPage] = useState(true);
  const [quizKey, setQuizKey] = useState(0);
  const [loading, setLoading] = useState();
  const { id } = searchParams;

  useEffect(() => {
    if (id) {
      generateSummary();
    }
  }, [id]);
  function restartQuiz() {
    setQuizKey((prev) => prev + 1);
    setPage(false);
  }
  async function generateSummary() {
    try {
      const response = await fetch("/api/getSummarizationData", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data) {
        setContent(data.data.rows[0].summary);
        setTitle(data.data.rows[0].title);
        localStorage.setItem(
          "summarization-history",
          JSON.stringify(data.data.rows[0])
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate quiz");
    }
  }
  async function nextPage() {
    try {
      const response = await fetch("/api/create-quiz", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      const data = await response.json();

      if (data) {
        const res = cleanAndParseJSON(data.data.text);
        setQuiz(res);
        console.log(res);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate quiz");
    }
    setPage(false);
  }
  return (
    <div>
      {page && (
        <Summarize.Provider value={{ content }}>
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
                  <h1 className="text-[24px] mt-[-17] font-bold">{title}</h1>
                  <p>{content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={"/home"}>
                    {" "}
                    <Button
                      onClick={generateSummary}
                      className="text-black flex-end bg- white border border-muted-foreground"
                      variant="secondary"
                    >
                      See content
                    </Button>
                  </Link>

                  <Button
                    onClick={nextPage}
                    className="text-white flex-end bg-black border border-muted-foreground hover:text-black"
                    variant="secondary"
                  >
                    Take quiz
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Summarize.Provider>
      )}
      {!page && (
        <QuizPage
          key={quizKey}
          restartQuiz={restartQuiz}
          quiz={quiz}
        ></QuizPage>
      )}
    </div>
  );
};
