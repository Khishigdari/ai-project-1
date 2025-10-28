import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Chat prompt is required" },
      { status: 400 }
    );
  }
  // Convert File to Bytes
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "You are an image describer. Describe the uploaded image naturally within 30 words.",
          },
          {
            inlineData: {
              mimeType: file.type,
              data: Buffer.from(bytes).toString("base64"),
            },
          },
        ],
      },
    ],
  });

  const text = response?.text || "No description generated.";

  return NextResponse.json({ text });
};
