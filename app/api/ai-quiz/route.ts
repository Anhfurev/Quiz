import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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
  const formData = await req.formData();
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  console.log(content, "content", title, "title");
  const ad = await query(
    `INSERT INTO article (title,content,summary) VALUES ('${title}','${content}')`
  );
  const response = await main(content);

  return NextResponse.json(
    {
      message: "Ai chatbot working",
      data: response,
    },
    {
      status: 200,
    }
  );
}

export const GET = async () => {
  const students = await query("SELECT * FROM students");
  console.log(students);
  return Response.json(
    {
      message: "Ai chatbot working",
      data: students,
    },
    {
      status: 200,
    }
  );
};
