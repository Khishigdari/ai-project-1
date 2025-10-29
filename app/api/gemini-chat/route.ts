// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export const POST = async (req: NextRequest) => {
//   const { chat } = await req.json();

//   if (!chat) {
//     return NextResponse.json(
//       { error: "Chat prompt is required" },
//       { status: 400 }
//     );
//   }
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Answer within 30 words.

// User question: "${chat}"`,
//   });
//   console.log(response.text);

//   return NextResponse.json({ text: response.text });
// };

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { chat, chatResponse } = await req.json();

  if (!chat) {
    return NextResponse.json(
      { error: "Chat prompt is required" },
      { status: 400 }
    );
  }
  const response = await ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [{ text: chat }],
      },
      {
        role: "model",
        parts: [{ text: `Answer within 30 words. ${chatResponse}` }],
      },
    ],
  });
  const response1 = await response.sendMessage({
    message: chat,
  });
  console.log("Chat response 1:", response1.text);

  const response2 = await response.sendMessage({
    message: chat,
  });
  console.log("Chat response 1:", response2.text);

  return NextResponse.json({
    text: response1.text,
    text2: response2.text,
  });
};
