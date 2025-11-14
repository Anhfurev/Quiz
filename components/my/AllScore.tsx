"use client";
import React, { useEffect, useState } from "react";

import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";
import { AlertDialogOfDelete } from "./AlertDialogOfDelete";

export const AllScore = ({ score, restartQuiz }: any) => {
  const [page, setPage] = useState<any>(0);

  useEffect(() => {}, []);

  return (
    <div className="w-full flex justify-center">
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
        </div>
        <div className="flex justify-between">
          <h1 className="text-7xl font-bold">
            SCORE <span>{score}</span>
          </h1>
          <Button onClick={restartQuiz} className="items-start">
            Restart quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
