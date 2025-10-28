import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { chat } = await req.json();

  if (!chat) {
    return NextResponse.json(
      { error: "Chat prompt is required" },
      { status: 400 }
    );
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Answer within 30 words.

User question: "${chat}"`,
  });
  console.log(response.text);

  return NextResponse.json({ text: response.text });
};
