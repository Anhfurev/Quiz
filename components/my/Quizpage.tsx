"use client";
import React, { useEffect, useState } from "react";

import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";
import { AlertDialogOfDelete } from "./AlertDialogOfDelete";
import { AllScore } from "./AllScore";

export const QuizPage = ({ quiz, restartQuiz }: any) => {
  const [page, setPage] = useState<any>(0);
  const [score, setScore] = useState<any>(0);
  function nextPage(i: any) {
    if (quiz[0].answer == i) {
      setScore((prev: any) => prev + 1);
    }
    setPage((prev: any) => prev + 1);
  }

  useEffect(() => {}, []);

  return (
    <div className="w-full flex justify-center">
      {page == 4 ? (
        <AllScore restartQuiz={restartQuiz} score={score}></AllScore>
      ) : (
        <div className="w-[70%] justify-center mt-20 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
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
                Quick test
              </CardAction>
            </div>
            <div>
              <AlertDialogOfDelete>
                <Button className="bg-white text-black hover:text-white">
                  X
                </Button>
              </AlertDialogOfDelete>
            </div>
          </div>
          <div>
            <div>
              <CardDescription className="text-[16px] font-bold flex items-center gap-2">
                Take a quick test about your knowledge from your content
              </CardDescription>
              <Card className="p-7 flex justify-center m-auto mt-4">
                <div className="flex text-3xl font-bold justify-between">
                  <h1> {quiz[page].question}</h1>
                  <h1 className="flex">
                    {page + 1} <span className="text-muted-foreground">/5</span>
                  </h1>
                </div>
                <div className="flex flex-wrap gap-5 justify-between">
                  {quiz[page].options.map((e: any, i: number) => (
                    <Card
                      key={i}
                      onClick={() => nextPage(i)}
                      className="w-[48%] h-6 flex items-center justify-center p-10"
                    >
                      <h1>{e}</h1>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
