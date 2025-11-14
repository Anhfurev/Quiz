import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

async function main(content: any) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${content}`,
  });
  return response;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;

  const response = await main(content);
  const candidates = response.candidates?.[0];
  const contentt = candidates?.content;
  const part = contentt?.parts?.[0];
  const text = part?.text;
  console.log(content);
  const newArticle = await prisma.article.create({
    data: {
      title,
      content,
      summary: text,
    },
  });

  return NextResponse.json(
    {
      message: "Ai chatbot working",
      data: newArticle,
      id: newArticle.id,
    },
    {
      status: 200,
    }
  );
}
export async function GET() {
  const historyArticle = await prisma.article.findMany();
  return NextResponse.json(
    {
      message: "Ai chatbot working",
      data: historyArticle,
    },
    {
      status: 200,
    }
  );
}
