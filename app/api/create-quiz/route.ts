import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
async function main(content: any) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 multiple choice questions based on this article: ${content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
  });
  return response;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await main(body.content);
  const candidates = res.candidates?.[0];
  const contentt = candidates?.content;
  const part = contentt?.parts?.[0];

  const newArticle = await prisma.quiz.create({
    data: {},
  });

  return NextResponse.json(
    {
      message: "Ai chatbot working",
      data: part,
    },
    {
      status: 200,
    }
  );
}
