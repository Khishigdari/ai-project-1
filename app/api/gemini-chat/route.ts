import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  //   try {
  const { chat } = await req.json();

  if (!chat) {
    return NextResponse.json(
      { error: "Chat prompt is required" },
      { status: 400 }
    );
  }
  // async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // contents: "Explain how AI works in a few words",
    contents: chat,
  });
  console.log(response.text);

  // }
  // main();
  return NextResponse.json({ text: response.text });
  //   } catch (error) {
  //     console.log("Error generating chat:", error);
  //     return NextResponse.json(
  //       { error: "Failed to generate chat" },
  //       { status: 500 }
  //     );
  //   }
};
