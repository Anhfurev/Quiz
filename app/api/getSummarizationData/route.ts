import { query } from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const article = await query(`SELECT * FROM article WHERE id = ${body.id}`);

  return NextResponse.json(
    {
      message: "Ai chatbot working",
      data: article,
    },
    {
      status: 200,
    }
  );
}
