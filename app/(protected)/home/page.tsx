"use client";
import CardOfArticle from "@/components/my/CardOfArticle";
import React, { createContext } from "react";
const CardOfArticleContext = createContext("as");
const page = () => {
  return (
    <div>
      <CardOfArticle></CardOfArticle>
    </div>
  );
};

export default page;
